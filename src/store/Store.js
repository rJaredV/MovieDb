import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Movies from '../reducers/Movies';

const rootReducer = combineReducers({
    movies: Movies,
});

export default function configureStore() {
    let store = createStore(rootReducer, applyMiddleware(thunk));
    return store;
}