import {APP_NAME as namespace} from "../../constants/vars";
import {constructLocalized} from "extensible-duck";

const initialState = {
  pops: [],
  stash: {},
  collection: {},
  paginateRequests: {},
  listRequests: {},
};

export default (store) => ({
  namespace,
  types: [],
  consts: {},
  store,
  initialState,
  reducer: (state, action, duck) => {
    // console.log(action.type, store);
    return state
  },
  selectors: (duck) => ({
    root: (state, props) => state,
    props: (state, props) => props,
    uid: (state, props) => props.uid,
    id: (state, props) => props.id,
    ...constructLocalized({
      pops: (state, gState) => state.pops,
      collection: (state, gState) => state.collection,
      paginateRequests: (state, gState) => state.paginateRequests,
      listRequests: (state, gState) => state.listRequests,
    })(duck)
  }),
  creators: () => ({}),
  sagas: () => ({}),
  takes: () => ([]),
})
