// In your application's entrypoint
// import { enableMapSet } from "immer"
// enableMapSet()
import Duck, { constructLocalized } from 'extensible-duck';
import { take, put, takeEvery, call, select } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import {createCachedSelector} from 're-reselect';
import produce from "immer";
import sift, { createEqualsOperation } from "sift";
import merge from "lodash/merge";
import sortBy from "lodash/sortBy";
import omitBy from "lodash/omitBy";
import omit from "lodash/omit";
import pick from "lodash/pick";
import cloneDeep from "lodash/cloneDeep";
import client from '../api/feathersClient';
import ObjectId from 'bson-objectid';
import extractPopulatedFields from './extractPopulatedFields';

const initialData = (_id = "") => ({ _id, __isLoading: true, __error: null })

export default (serviceName, duck) => {
  const Service = client.service(serviceName)
  return  {
    types: [
      "PATCH", "PATCH_PENDING", "PATCH_FULFILLED", "PATCH_REJECTED",
      "CREATE", "CREATE_PENDING", "CREATE_FULFILLED", "CREATE_REJECTED",
      "REMOVE", "REMOVE_PENDING", "REMOVE_FULFILLED", "REMOVE_REJECTED",
    ],
    reducer: (_state, action, duck) => {
      const { payload, meta } = action
      return produce(_state, state => {
        switch(action.type) {
          case duck.types.PATCH:
          case duck.types.PATCH_PENDING: {
            state.collection[meta._id] = merge(state.collection[meta._id] || {}, payload, {__stashBefore: state.collection[meta._id]});
            break;
          }
          case duck.types.PATCH_FULFILLED: {
            const {pops = [], raw = payload, rootId = payload._id} = extractPopulatedFields(payload)
            state.pops = state.pops.concat(pops)
            state.collection[meta._id] = merge(state.collection[meta._id], raw, {__stashBefore: null});
            break;
          }
          case duck.types.PATCH_REJECTED:
            state.collection[meta._id] = state.collection[meta._id].__stashBefore; break;

          case duck.types.CREATE:
          case duck.types.CREATE_PENDING:
            state.collection[meta.tid] = merge({ _id: meta.tid }, payload); break;
          case duck.types.CREATE_FULFILLED: {
            const {pops = [], raw = payload, rootId = payload._id} = extractPopulatedFields(payload)
            state.pops = state.pops.concat(pops)
            delete state.collection[meta.tid]
            state.collection[raw._id] = raw;
            break;
          }
          case duck.types.CREATE_REJECTED:
            state.collection[meta.tid].__error = payload.message; break;

          case duck.types.REMOVE:
          case duck.types.REMOVE_PENDING:
            if (state.collection.hasOwnProperty(meta._id)) {
              state.stash[meta._id] = state.collection[meta._id]
              delete state.collection[meta._id];
            }
            break;
          case duck.types.REMOVE_FULFILLED:
            if (state.stash.hasOwnProperty(meta._id))
              delete state.stash[meta._id];
            break;
          case duck.types.REMOVE_REJECTED:
            if (state.stash.hasOwnProperty(meta._id)) {
              state.collection[meta._id] = state.stash[meta._id]
              delete state.stash[meta._id];
            }
            break;
        }
      })
    },
    selectors: (duck) => ({
    }),
    creators: (duck) => ({
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
      remove: (_id, params) => {
        return {
          type: duck.types.REMOVE,
          meta: { _id, params },
          payload: {
            promise: Service.remove(_id, params),
            data: initialData(_id)
          }
        }
      }
    })
  }
}

