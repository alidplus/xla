import Duck, { constructLocalized } from 'extensible-duck'
import { put, takeEvery, call } from 'redux-saga/effects'
import { APP_NAME } from '../../constants/vars'
import client from '../api/feathersClient'
import merge from "lodash/merge";
import axios from "axios";

const initialState = {
    accessToken: null,
    user: null,
    permissions: null,
    error: null,
    authentication: null
};

export default new Duck({
    namespace: APP_NAME,
    store: 'auth',
    types: [
        "AUTH", "AUTH_PENDING", "AUTH_FULFILLED", "AUTH_REJECTED",
        'AUTH_SUCCESS', 'LOG_OUT'
    ],
    initialState,
    reducer: (state, action, duck) => {
        if (action.type.includes('_REJECTED') && action.payload.name === 'NotAuthenticated') {
            return duck.initialState;
        }
        switch(action.type) {
            case duck.types.AUTH:
            case duck.types.AUTH_PENDING:
                return duck.initialState;
            case duck.types.AUTH_FULFILLED:
                return action.payload;
            case duck.types.AUTH_REJECTED:
                return {...duck.initialState, error: action.payload};
            case duck.types.LOG_OUT:
                return duck.initialState;
            default: return state;
        }
    },
    selectors: constructLocalized({
        root: (state, gState) => state,
        form: (state, gState) => state.form,
        authUser: (state, gState) => state.user,
        accessToken: (state, gState) => state.jwt,
        isAuthenticating: (state, gState) => state.loading,
        error: (state, gState) => state.error,
    }),
    creators: (duck) => ({
        authenticate: (form) => {
            return {
                type: duck.types.AUTH,
                meta: {form},
                payload: {
                    promise: (async () => {
                        try {
                            const auth = await client.authentication.authenticate({ strategy: 'local', ...form })
                            await axios.post('/api/accessToken', {accessToken: auth.accessToken})
                            return auth
                        } catch (e) {
                            console.log('authenticate failed')
                            return {}
                        }
                    })(),
                    data: {}
                }
            }
        },
        reAuthenticate: (accessToken) => {
            return {
                type: duck.types.AUTH,
                meta: {accessToken},
                payload: {
                    promise: (async () => {
                        try {
                            client.authentication.setAccessToken(accessToken)
                            return client.authentication.reAuthenticate()
                        } catch (e) {
                            console.log('reAuthenticate failed')
                            return {}
                        }
                    })(),
                    data: {}
                }
            }
        },
        logout: () => ({ type: duck.types.LOG_OUT })
    }),
    sagas: (duck) => ({
        logoutFeathersClient: function* (action) {
            yield client.logout()
        }
    }),
    // Defining observer
    takes: (duck) => ([
        takeEvery(duck.types.LOG_OUT, duck.sagas.logoutFeathersClient)
    ])
})

