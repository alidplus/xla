// In your application's entrypoint
import { enableMapSet } from "immer"
enableMapSet()
import Duck, { constructLocalized } from 'extensible-duck'
import { put, takeEvery, call } from 'redux-saga/effects'
import {createCachedSelector} from 're-reselect';
import produce from "immer"
import merge from "lodash/merge"
import cloneDeep from "lodash/cloneDeep"
import pick from "lodash/pick"
import { APP_NAME } from '../../constants/vars'
import client from '../api/feathersClient'
import hash from 'object-hash'

const initialState = {
  collection: {},
  paginateRequests: {},
  listRequests: {},
};
const wait = (ms) => new Promise(res => setTimeout(res, ms))

const initialData = (_id = "") => ({ _id, __isLoading: true, __error: null })


export default (serviceName) => {
  const Service = client.service(serviceName)
  const duck = new Duck({
    namespace: APP_NAME,
    store: serviceName,
    types: [
      "GET", "GET_PENDING", "GET_FULFILLED", "GET_REJECTED",
      "FIND", "FIND_PENDING", "FIND_FULFILLED", "FIND_REJECTED",
      "LIST", "LIST_PENDING", "LIST_FULFILLED", "LIST_REJECTED",
    ],
    initialState,
    reducer: (_state, action, duck) => {
      const { payload, meta } = action
      return produce(_state, state => {
        switch(action.type) {
          case duck.types.GET:
          case duck.types.GET_PENDING:
            state.collection[meta._id] = payload; break;
          case duck.types.GET_FULFILLED:
            state.collection[meta._id] = merge(state.collection[meta._id], payload, {__isLoading: false}); break;
          case duck.types.GET_REJECTED:
            state.collection[meta._id] = merge(state.collection[meta._id], {__error: payload, __isLoading: false}); break;

          case duck.types.FIND:
          case duck.types.FIND_PENDING:
            state.paginateRequests[meta.uid] = payload; break;
          case duck.types.FIND_FULFILLED:
            console.log('FIND_FULFILLED', payload)
            payload.data.forEach(d => {
              state.collection[d._id] = d
            })
            payload.data = payload.data.map(d => d._id)
            state.paginateRequests[meta.uid] = merge(state.paginateRequests[meta.uid], payload, {__isLoading: false, __error: null}); break;
          case duck.types.FIND_REJECTED:
            state.paginateRequests[meta.uid] = merge(state.paginateRequests[meta.uid], {__error: payload, __isLoading: false}); break;

          case duck.types.LIST:
          case duck.types.LIST_PENDING:
            state.listRequests[meta.uid] = payload; break;
          case duck.types.LIST_FULFILLED:
            payload.forEach(d => {
              state.collection[d._id] = d
            })
            const data = payload.map(d => d._id)
            state.listRequests[meta.uid] = merge(state.listRequests[meta.uid], { data, total: data.length }, {__isLoading: false, __error: null}); break;
          case duck.types.LIST_REJECTED:
            state.listRequests[meta.uid] = merge(state.listRequests[meta.uid], {__error: payload, __isLoading: false}); break;
        }
      })
    },
    selectors: (...args) => ({
      root: (state, props) => state,
      props: (state, props) => props,
      ...constructLocalized({
        collection: (state, gState) => state.collection,
        paginateRequests: (state, gState) => state.paginateRequests,
        listRequests: (state, gState) => state.listRequests,
      })(...args),

      get: new Duck.Selector(selectors =>
        createCachedSelector(
          selectors.collection,
          selectors.props,
          (collection, props) => {
            if (!collection.hasOwnProperty(props.id)) return null
            else return collection[props.id]
          }
        )( (state, props) => props.id )
      ),
      find: new Duck.Selector(selectors =>
        createCachedSelector(
          selectors.root,
          selectors.paginateRequests,
          selectors.props,
          (root, paginateRequests, props) => {
            if (!paginateRequests.hasOwnProperty(props.uid)) return null
            const paginate = cloneDeep(paginateRequests[props.uid])
            paginate.data = paginate.data.map(id => selectors.get(root, { id }))
            return paginate
          }
        )( (state, props) => props.uid )
      ),
      list: new Duck.Selector(selectors =>
        createCachedSelector(
          selectors.root,
          selectors.listRequests,
          selectors.props,
          (root, listRequests, props) => {
            if (!listRequests.hasOwnProperty(props.uid)) return null
            const list = cloneDeep(listRequests[props.uid])
            list.data = list.data.map(id => selectors.get(root, { id }))
            return list
          }
        )( (state, props) => props.uid )
      ),
    }),
    creators: (duck) => ({
      get: (_id, params) => {
        return {
          type: duck.types.GET,
          meta: { _id, params },
          payload: {
            promise: Service.get(_id, params),
            data: initialData(_id)
          }
        }
      },
      find: (uid, query) => {
        return ({
          type: duck.types.FIND,
          meta: { query, uid },
          payload: {
            promise: Service.find({ query }),
            data: { total: 0, limit: 10, skip: 0, data: [], __isLoading: true, __error: null }
          }
        })
      },
      list: (uid, query) => ({
        type: duck.types.LIST,
        meta: { query, uid },
        payload: {
          promise: Service.find({ query: { ...query, $limit: -1 } }),
          data: { total: 0, data: [], __isLoading: true, __error: null }
        }
      })
    }),
    sagas: (duck) => ({
      // handleGetRequest: function* (action) {
      //   try {
      //     yield put({ type: duck.types.AWAIT_UPDATE, _id: action._id })
      //     const payload = yield Service.get(action._id)
      //     yield put({ type: duck.types.UPDATE, _id: action._id, payload })
      //   } catch(error) {
      //     yield put({ type: duck.types.UPDATE_FAIL, _id: action._id, error })
      //   }
      // }
    }),
    takes: (duck) => ([
      // takeEvery(duck.types.REQUEST_GET, duck.sagas.handleGetRequest)
    ])
  })

  return duck
}

