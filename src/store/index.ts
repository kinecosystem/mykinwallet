'use strict';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import rootSaga from './saga';
//TODO: apply middleware in case of authorization hook
// import { apiMiddleware } from './middleware/developer/apiMiddleware';

const sagaMiddleware = createSagaMiddleware();

export interface IRootReducerState {
	errors: [];
}

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
