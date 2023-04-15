// import produce from "immer";
// import Duck from "extensible-duck";
// import {createCachedSelector} from "re-reselect";

export default (ducks, serviceName) => {
  const duck = ducks[serviceName]
  return  {
    types: [],

    consts: {
      textSearch: true,
    },

    reducer: (_state, action, duck) => {
      return _state
    },

    selectors: (duck) => ({

    }),

    creators: (duck) => ({

    }),
    sagas: (duck) => ({

    }),

    takes: (duck) => ([

    ])
  }
}
