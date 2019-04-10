'use strict';
import { combineReducers } from 'redux';
import { IRootReducerState } from '..';
import { reducer as formReducer } from 'redux-form';
import categoriesStore from './site/categories.reducer';
import statsReducer from './site/stats.reducer';
import blockchainReducer from './site/blockChainExplorer.reducer';
import authReducer from './developer/auth.reducer';
import cookieReducer from './cookie.reducer';
import { dialogReducer } from 'redux-dialog';

const init = {};

export const rootReducer = combineReducers<IRootReducerState>({
	init
	// categoriesStore,
	// statsReducer,
	// blockchainReducer,
	// auth: authReducer,
	// form: formReducer,
	// dialogReducer,
	// cookieReducer,
});
