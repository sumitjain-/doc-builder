import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import reducers from './reducers';

const middlewareChain = [];

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middlewareChain.push(logger);
}

const store = createStore(reducers, {}, applyMiddleware(...middlewareChain));


export default store;
