import Duck, { constructLocalized } from 'extensible-duck'
import { put, takeEvery, call } from 'redux-saga/effects'
import { APP_NAME } from '../../constants/vars'

const initialState = {
    toggle: false
};

export default new Duck({
    namespace: APP_NAME,
    store: 'layout',
    types: ['TOGGLE'],
    initialState,
    reducer: (state, action, duck) => {
        // if (action.type === '@@INIT') {
        //     console.log('layout', '@@INIT')
        // }
        switch(action.type) {
            case duck.types.TOGGLE:
                return { ...state, toggle: !state.toggle };
            default: return state
        }
    },
    selectors: constructLocalized({
        toggle: (state, gState) => state.toggle,
    }),
    creators: (duck) => ({
        toggle: () => ({ type: duck.types.TOGGLE })
    }),
    sagas: (duck) => ({
    }),
    // Defining observer
    takes: (duck) => ([
    ])
})

