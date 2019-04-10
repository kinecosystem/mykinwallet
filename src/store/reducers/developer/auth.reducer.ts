'use strict';
import { AuthActions, IAuthState } from './../../interfaces/developer/auth';
import { authActionTypes } from './../../actionConsts/developer/auth';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState: IAuthState = {
	email: '',
	token: null,
	error: '',
	user: { name: '', company: '', phone: '', recieveNewsletter: null }
};

const authReducer = (state = initialState, action: AuthActions) => {
	switch (action.type) {
		case authActionTypes.LOGIN_SUCCESS: {
			return {
				...state,
				...action.payload
			};
		}

		case authActionTypes.FORGOT_PASSWORD_LOGIN_MESSAGE: {
			return {
				...state,
				error: action.payload
			};
		}

		case authActionTypes.LOGIN_FAILURE: {
			return {
				...state,
				error: action.payload
			};
		}

		case authActionTypes.RESET_PASSWORD_FAILURE: {
			return {
				...state,
				error: action.payload
			};
		}
		case authActionTypes.RESET_ERROR_MESSAGE:
			return {
				...state,
				error: ''
			};

		case authActionTypes.LOGOUT:
			return {
				email: '',
				token: null,
				error: '',
				user: {
					name: '',
					company: '',
					phone: '',
					recieveNewsletter: false
				}
			};

		case authActionTypes.GET_USER_SUCCESS:
			const { email, name, company, phone, recieveNewsletter } = action.payload;
			return {
				...state,
				email,
				user: { name, company, phone, recieveNewsletter }
			};

		case authActionTypes.USER_PROFILE_FAILURE: {
			return {
				...state,
				error: action.payload
			};
		}

		default:
			return state;
	}
};

const persistConfig = {
	key: 'auth',
	storage: storage,
	blacklist: ['error', 'user']
};

export default persistReducer(persistConfig, authReducer);
