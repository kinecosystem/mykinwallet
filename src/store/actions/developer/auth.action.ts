import { authActionTypes } from './../../actionConsts/developer/auth';

export const loginRequest = (formValues, callback) => {
	return {
		type: authActionTypes.LOGIN_REQUEST,
		payload: callback,
		request: {
			url: 'login',
			method: 'POST',
			data: formValues
		}
	};
};

export const loginSuccess = user => ({
	type: authActionTypes.LOGIN_SUCCESS,
	payload: user
});

export const loginFailure = (error: string) => {
	return {
		type: authActionTypes.LOGIN_FAILURE,
		payload: error || 'Email or Password are incorrect'
	};
};

export const forgotPasswordRequest = (formValues, callback) => {
	return {
		type: authActionTypes.FORGOT_PASSWORD_REQUEST,
		payload: callback,
		request: {
			url: 'reset',
			method: 'POST',
			data: formValues
		}
	};
};

export const forgotPasswordMessage = (message: string) => {
	return {
		type: authActionTypes.FORGOT_PASSWORD_LOGIN_MESSAGE,
		payload: message
	};
};

export const forgotPasswordFailure = (error: string) => {
	return {
		type: authActionTypes.RESET_PASSWORD_FAILURE,
		payload: error || 'Invalid token'
	};
};

export const resetPasswordRequest = (formValues, callback) => {
	return {
		type: authActionTypes.RESET_PASSWORD_REQUEST,
		payload: callback,
		request: {
			url: 'new-password',
			method: 'POST',
			data: formValues
		}
	};
};

export const resetErrorMessage = () => ({
	type: authActionTypes.RESET_ERROR_MESSAGE
});

export const logout = () => ({
	type: authActionTypes.LOGOUT
});

export const getUser = () => ({
	type: authActionTypes.GET_USER,
	request: {
		url: 'user',
		method: 'GET'
	}
});

export const getUserSuccess = user => ({
	type: authActionTypes.GET_USER_SUCCESS,
	payload: user
});

export const UserProfileRequest = (formValues, callback) => ({
	type: authActionTypes.USER_PROFILE_REQUEST,
	payload: callback,
	request: {
		url: 'userProfile',
		method: 'POST',
		data: formValues
	}
});

export const UserProfileFailure = (error: string) => {
	return {
		type: authActionTypes.USER_PROFILE_FAILURE,
		payload: error
	};
};

export const deleteUser = () => ({
	type: authActionTypes.DELETE_USER_REQUEST,
	request: {
		url: 'user',
		method: 'DELETE'
	}
});
