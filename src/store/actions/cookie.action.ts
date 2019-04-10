import { cookieActionTypes } from '../actionConsts/cookie';

export const acceptCookie = (accepted: boolean) => {
	return {
		type: cookieActionTypes.COOKIE_ACCEPTED,
		payload: accepted
	};
};
