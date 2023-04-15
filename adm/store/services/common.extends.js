// import produce from "immer";
// import Duck from "extensible-duck";
// import {createCachedSelector} from "re-reselect";
import partition from 'lodash/partition'

import {call, put, select, take, takeEvery} from "redux-saga/effects";
import produce from "immer";
import {eventChannel} from "redux-saga";
import client from "../api/feathersClient";

export default (ducks, serviceName) => {
  const Service = client.service(serviceName)
  const duck = ducks[serviceName]
  return  {
    types: [
      'POPS_CLEAN', 'POPS_JOIN'
    ],

    reducer: (_state, action, duck) => {
      const { payload, meta } = action
      return produce(_state, state => {
        switch(action.type) {
          case duck.types.POPS_CLEAN:
            state.pops = []; break;
          case duck.types.POPS_JOIN:
            payload.forEach(pop => {
              state.collection[pop._id] = pop;
            })
            break;
        }
      })
    },

    selectors: (duck) => ({

    }),

    creators: (duck) => ({

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
                type: duck.types.GET,
                meta: { tid: data._id },
                payload: data
              }); break;
              case 'patched': yield put({
                type: duck.types.GET,
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
      },
      cleanupPops: function* () {
        const pops = yield select(duck.selectors.pops)
        if (pops.length === 0) return
        yield put({ type: duck.types.POPS_CLEAN });
        const partitions = pops.reduce((acc, pop) => {
          if (pop.__model) {
            if (!acc[pop.__model]) acc[pop.__model] = []
            acc[pop.__model].push(pop)
          }
          return acc
        }, {})
        for (const modelName of Object.keys(partitions)) {
          yield put({ type: ducks[modelName].types.POPS_JOIN, payload: partitions[modelName] });
        }
      }
    }),

    takes: (duck) => ([
      takeEvery("*", duck.sagas.cleanupPops),
      takeEvery("persist/REHYDRATE", duck.sagas.setupEventsChannel),
      // takeEvery(duck.types.CREATE_FULFILLED, duck.sagas.reloadAllFinds),
      // takeEvery(duck.types.CREATE_FULFILLED, duck.sagas.reloadAllLists)
    ])
  }
}
