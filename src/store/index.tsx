import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import {  persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import  {reducer as rooms }  from './rooms/reducers';
import { reducer as articles } from './articles/reducers';
import { reducer as cart } from './cart/reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};
const rootReducer = combineReducers({
    rooms,
    articles,
    cart
});


export default function configureStore() {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
  return createStore(persistedReducer,  applyMiddleware(thunk));
}
