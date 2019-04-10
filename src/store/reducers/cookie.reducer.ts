import { cookieActionTypes } from '../actionConsts/cookie';
import { ICookieState } from '../interfaces/cookie';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initalState: ICookieState = {
	accepted: false
};

const cookieReducer = (state = initalState, action: any) => {
	switch (action.type) {
		case cookieActionTypes.COOKIE_ACCEPTED: {
			return { ...state, accepted: action.payload };
		}

		default: {
			return state;
		}
	}
};

const persistConfig = {
	key: 'cookie',
	storage: storage
};

export default persistReducer(persistConfig, cookieReducer);
