import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import csvReducer from '../Reducers/csvReducer';

// with REDUX (one can be enabled at a time)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

// without REDUX (one can be enabled at a time)
// const composeEnhancers = compose;

export default () => {
    const store = createStore(combineReducers({
        csv : csvReducer,
    }), composeEnhancers(applyMiddleware(thunk)))
    return store;
}