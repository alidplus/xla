import Duck from 'extensible-duck';
import {createCachedSelector} from 're-reselect';
import produce from "immer";
import sift, { createEqualsOperation } from "sift";
import merge from "lodash/merge";
import sortBy from "lodash/sortBy";
import omit from "lodash/omit";
import pick from "lodash/pick";
import cloneDeep from "lodash/cloneDeep";
import client from '../api/feathersClient';
import extractPopulatedFields from './extractPopulatedFields';


const OPERATORS = ['$sort', '$limit', '$skip', '$select', '$search']

const siftOptions = {
  // operations: {
  //   $search(params, ownerQuery, options) {
  //     return createEqualsOperation(
  //       value => {
  //         console.log('siftOptions operations $search', {params, ownerQuery, options, value})
  //         return value % params !== 0
  //       },
  //       ownerQuery,
  //       options
  //     );
  //   }
  // }
}

export default (serviceName, duck) => {
  const Service = client.service(serviceName)
  return  {
    types: [
      "FIND", "FIND_PENDING", "FIND_FULFILLED", "FIND_REJECTED",
      "LIST", "LIST_PENDING", "LIST_FULFILLED", "LIST_REJECTED",
    ],
    reducer: (_state, action, duck) => {
      const { payload, meta } = action
      return produce(_state, state => {
        switch(action.type) {

          case duck.types.FIND:
          case duck.types.FIND_PENDING: {
            state.paginateRequests[meta.uid] = Object.assign(state.paginateRequests[meta.uid] ?? {}, payload, {
              __isLoading: false,
              __error: null
            });
            break;
          }
          case duck.types.FIND_FULFILLED: {
            payload.data = payload.data.map(d => {
              const { pops = [], raw = d, rootId = d._id } = extractPopulatedFields(d)
              state.collection[rootId] = raw
              state.pops = state.pops.concat(pops)
              return rootId
            })
            state.paginateRequests[meta.uid] = merge(state.paginateRequests[meta.uid], payload, {
              __isLoading: false,
              __error: null
            });
            break;
          }
          case duck.types.FIND_REJECTED: {
            state.paginateRequests[meta.uid] = merge(state.paginateRequests[meta.uid], {
              __error: payload,
              __isLoading: false
            });
            break;
          }

          case duck.types.LIST:
          case duck.types.LIST_PENDING: {
            state.listRequests[meta.uid] = payload;
            break;
          }
          case duck.types.LIST_FULFILLED: {
            const data = payload.map(d => {
              const {pops = [], raw = d, rootId = d._id} = extractPopulatedFields(d)
              state.collection[rootId] = raw
              state.pops = state.pops.concat(pops)
              return rootId
            })
            state.listRequests[meta.uid] = merge(state.listRequests[meta.uid], {
              data,
              total: data.length
            }, {__isLoading: false, __error: null});
            break;
          }
          case duck.types.LIST_REJECTED: {
            state.listRequests[meta.uid] = merge(state.listRequests[meta.uid], {__error: payload.message, __isLoading: false});
            break;
          }
        }
      })
    },
    selectors: (duck) => ({
      find: new Duck.Selector(selectors =>
        createCachedSelector(
          selectors.collection,
          selectors.paginateRequests,
          selectors.uid,
          (collection, paginateRequests, uid) => {
            if (!paginateRequests.hasOwnProperty(uid)) return { data: [], skip: 0, limit: 10, total: 0 }
            const { $skip = 0, $limit = 10, $sort = '', $select = ''} = pick(paginateRequests[uid].query, OPERATORS)
            const paginate = cloneDeep(paginateRequests[uid])
            if (Array.isArray(paginate.data)) {
              paginate.data = paginate.data.map(k => collection[k])
              return paginate
            }
            const sifter = sift(omit(paginateRequests[uid].query, OPERATORS), siftOptions)
            paginate.data = sortBy(Object.keys(collection).map(k => collection[k]), $sort.split(' ')).
              filter(sifter).
              slice($skip, $skip + $limit)
            return paginate
          }
        )( (state, props) => props.uid )
      ),

      list: new Duck.Selector(selectors =>
        createCachedSelector(
          selectors.collection,
          selectors.listRequests,
          selectors.uid,
          (collection, listRequests, uid) => {
            if (!listRequests.hasOwnProperty(uid)) return { total: 0, data: [] }
            const { $skip = 0, $limit = 10, $sort = '', $select = ''} = pick(listRequests[uid].query, OPERATORS)
            const list = cloneDeep(listRequests[uid])
            if (Array.isArray(list.data)) {
              list.data = list.data.map(k => collection[k])
              return list
            }
            const sifter = sift(omit(listRequests[uid].query, OPERATORS), siftOptions)
            list.data = sortBy(Object.keys(collection).map(k => collection[k]), $sort.split(' ')).filter(sifter)
            return list
          }
        )( (state, props) => props.uid )
      )
    }),
    creators: (duck) => ({
      find: (uid, query = {}) => {
        if(!query.$sort) query.$sort = '-createdAt'
        return ({
          type: duck.types.FIND,
          meta: { query, uid },
          payload: {
            promise: Service.find({ query }),
            data: { query, total: 0, limit: 10, skip: 0, data: null, __isLoading: true, __error: null }
          }
        })
      },
      list: (uid, query) => ({
        type: duck.types.LIST,
        meta: { query, uid },
        payload: {
          promise: Service.find({ query: { ...query, $limit: -1 } }),
          data: { query, total: 0, data: null, __isLoading: true, __error: null }
        }
      })
    })
  }
}

