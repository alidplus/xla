import {APP_NAME as namespace} from "../../constants/vars";

const initialState = {
  collection: {},
  paginateRequests: {},
  listRequests: {},
};

export default (store) => ({
  namespace,
  types: [],
  store,
  initialState,
  reducer: (state, action, duck) => state,
  selectors: () => ({}),
  creators: () => ({}),
  sagas: () => ({}),
  takes: () => ([]),
})
