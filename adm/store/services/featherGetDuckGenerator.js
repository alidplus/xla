// In your application's entrypoint
// import { enableMapSet } from "immer"
// enableMapSet()
import Duck from 'extensible-duck';
import {createCachedSelector} from 're-reselect';
import produce from "immer";
import merge from "lodash/merge";
import client from '../api/feathersClient';
import extractPopulatedFields from './extractPopulatedFields';

const initialData = (_id = "") => ({ _id, __isLoading: true, __error: null })

export default (serviceName, duck) => {
  const Service = client.service(serviceName)
  return  {
    types: [
      "GET", "GET_PENDING", "GET_FULFILLED", "GET_REJECTED"
    ],
    reducer: (_state, action, duck) => {
      const { payload, meta } = action
      return produce(_state, state => {
        switch(action.type) {
          case duck.types.GET:
          case duck.types.GET_PENDING: {
            state.collection[meta._id] = payload;
            break;
          }
          case duck.types.GET_FULFILLED: {
            const {pops = [], raw = payload, rootId = payload._id} = extractPopulatedFields(payload)
            state.pops = state.pops.concat(pops)
            state.collection[meta._id] = merge(state.collection[meta._id], raw, {__isLoading: false});
            break;
          }
          case duck.types.GET_REJECTED: {
            state.collection[meta._id] = merge(state.collection[meta._id], {__error: payload.message, __isLoading: false});
            break;
          }
        }
      })
    },
    selectors: (duck) => ({
      get: new Duck.Selector(selectors =>
        createCachedSelector(
          selectors.collection,
          selectors.props,
          (collection, props) => {
            if (!collection.hasOwnProperty(props.id)) return null
            else return collection[props.id]
          }
        )( (state, props) => String(props.id) )
      )
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
      }
    })
  }
}

