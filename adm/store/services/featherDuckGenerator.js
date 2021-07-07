// In your application's entrypoint
// import { enableMapSet } from "immer"
// enableMapSet()
import Duck, { constructLocalized } from 'extensible-duck';
import { take, put, takeEvery, call, select } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import {createCachedSelector} from 're-reselect';
import produce from "immer";
import merge from "lodash/merge";
import omitBy from "lodash/omitBy";
import cloneDeep from "lodash/cloneDeep";
import { APP_NAME } from '../../constants/vars';
import client from '../api/feathersClient';
import ObjectId from 'bson-objectid';

const initialState = {
  collection: {},
  paginateRequests: {},
  listRequests: {},
};

const initialData = (_id = "") => ({ _id, __isLoading: true, __error: null })

export default (serviceName, duck) => {
  const Service = client.service(serviceName)
  return  {
    types: [
      "GET", "GET_PENDING", "GET_FULFILLED", "GET_REJECTED",
      "FIND", "FIND_PENDING", "FIND_FULFILLED", "FIND_REJECTED",
      "LIST", "LIST_PENDING", "LIST_FULFILLED", "LIST_REJECTED",
      "PATCH", "PATCH_PENDING", "PATCH_FULFILLED", "PATCH_REJECTED",
      "CREATE", "CREATE_PENDING", "CREATE_FULFILLED", "CREATE_REJECTED",
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
            if (state.paginateRequests[meta.uid]) break;
            state.paginateRequests[meta.uid] = payload; break;
          case duck.types.FIND_FULFILLED:
            payload.data.forEach(d => { state.collection[d._id] = d })
            payload.data = payload.data.map(d => d._id)
            state.paginateRequests[meta.uid] = merge(state.paginateRequests[meta.uid], payload, {__isLoading: false, __error: null}); break;
          case duck.types.FIND_REJECTED:
            state.paginateRequests[meta.uid] = merge(state.paginateRequests[meta.uid], {__error: payload, __isLoading: false}); break;

          case duck.types.LIST:
          case duck.types.LIST_PENDING:
            state.listRequests[meta.uid] = payload; break;
          case duck.types.LIST_FULFILLED:
            payload.forEach(d => { state.collection[d._id] = d })
            const data = payload.map(d => d._id)
            state.listRequests[meta.uid] = merge(state.listRequests[meta.uid], { data, total: data.length }, {__isLoading: false, __error: null}); break;
          case duck.types.LIST_REJECTED:
            state.listRequests[meta.uid] = merge(state.listRequests[meta.uid], {__error: payload, __isLoading: false}); break;

          case duck.types.PATCH:
          case duck.types.PATCH_PENDING:
            state.collection[meta._id] = merge(state.collection[meta._id] || {}, payload, { __stashBefore: state.collection[meta._id] }); break;
          case duck.types.PATCH_FULFILLED:
            state.collection[meta._id] = merge(state.collection[meta._id], payload, { __stashBefore: null }); break;
          case duck.types.PATCH_REJECTED:
            state.collection[meta._id] = state.collection[meta._id].__stashBefore; break;

          case duck.types.CREATE:
          case duck.types.CREATE_PENDING:
            state.collection[meta.tid] = merge({ _id: meta.tid }, payload); break;
          case duck.types.CREATE_FULFILLED:
            delete state.collection[meta.tid]
            state.collection[payload._id] = payload; break;
          case duck.types.CREATE_REJECTED:
            state.collection[meta.tid].__error = payload.message; break;
        }
      })
    },
    selectors: (duck) => ({
      root: (state, props) => state,
      props: (state, props) => props,
      ...constructLocalized({
        collection: (state, gState) => state.collection,
        paginateRequests: (state, gState) => state.paginateRequests,
        listRequests: (state, gState) => state.listRequests,
      })(duck),

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
            data: { query, total: 0, limit: 10, skip: 0, data: [], __isLoading: true, __error: null }
          }
        })
      },
      list: (uid, query) => ({
        type: duck.types.LIST,
        meta: { query, uid },
        payload: {
          promise: Service.find({ query: { ...query, $limit: -1 } }),
          data: { query, total: 0, data: [], __isLoading: true, __error: null }
        }
      }),
      save: (_id, data, params) => {
        data = omitBy(data, (v, k) => k.startsWith('_'))
        if (_id && _id !== 'new') {
          return {
            type: duck.types.PATCH,
            meta: { _id, data, params },
            payload: {
              promise: Service.patch(_id, data, params),
              data
            }
          }
        } else {
          return {
            type: duck.types.CREATE,
            meta: { data, params, tid: ObjectId().toString() },
            payload: {
              promise: Service.create(data, params),
              data
            }
          }
        }
      },
      onPatch: (data) => ({
        type: duck.types.PATCH,
        meta: { _id: data._id },
        payload: data
      })
    }),
    sagas: (duck) => ({
      setupEventsChannel: function* (action) {
        const eventsChannel = yield call(() => eventChannel(emitter => {
          const onCreated = data => { emitter({ event: 'created', data }) }
          const onPatched = data => { emitter({ event: 'patched', data }) }
          Service.on('created', onCreated)
          Service.on('patched', onPatched)
          return () => {
            Service.off('created', onCreated)
            Service.off('patched', onPatched)
          }
        }))
        try {
          while (true) {
            // take(END) will cause the saga to terminate by jumping to the finally block
            const { event, data } = yield take(eventsChannel)
            switch (event) {
              case 'created': yield put({
                type: duck.types.CREATE,
                meta: { tid: data._id },
                payload: data
              }); break;
              case 'patched': yield put({
                type: duck.types.PATCH,
                meta: { _id: data._id },
                payload: data
              }); break;
            }
          }
        } finally {
          console.log('eventsChannel terminated')
        }
      },
      reloadAllFinds: function* () {
        const paginates = yield select(duck.selectors.paginateRequests)
        for (const uid in paginates) {
          const mutation = yield call(duck.creators.find, uid, paginates[uid].query)
          yield put(mutation)
        }
      },
      reloadAllLists: function* () {
        const lists = yield select(duck.selectors.listRequests)
        for (let uid in lists) {
          const mutation = yield call(duck.creators.list, uid, lists[uid].query)
          yield put(mutation)
        }
      }
    }),
    takes: (duck) => ([
      takeEvery("persist/REHYDRATE", duck.sagas.setupEventsChannel),
      takeEvery(duck.types.CREATE_FULFILLED, duck.sagas.reloadAllFinds),
      takeEvery(duck.types.CREATE_FULFILLED, duck.sagas.reloadAllLists)
    ])
  }
}

