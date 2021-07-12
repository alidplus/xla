// import produce from "immer";
// import Duck from "extensible-duck";
// import {createCachedSelector} from "re-reselect";
import partition from 'lodash/partition'

import {put, select, takeEvery} from "redux-saga/effects";
import produce from "immer";

export default (ducks, serviceName) => {
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
      cleanupPops: function* () {
        const pops = yield select(duck.selectors.pops)
        if (pops.length === 0) return
        console.log('------ cleanupPops ---------')
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
    ])
  }
}
