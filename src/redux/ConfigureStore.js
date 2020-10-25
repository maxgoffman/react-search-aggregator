import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Google } from './google/reducers/Google';
import { Bing } from './bing/reducers/Bing';

import thunk from 'redux-thunk';

/**
 * Create Redux Store
 */
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Google,
            Bing
        }),
        applyMiddleware(thunk)
    );
    
    return store;
}