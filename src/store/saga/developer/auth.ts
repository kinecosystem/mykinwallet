import { takeLatest, put, call } from 'redux-saga/effects';
import { authActionTypes } from './../../actionConsts/developer/auth';
import * as actions from './../../actions/developer/auth.action';
import * as IAuth from './../../interfaces/developer/auth';
import axios from 'axios';

function* fetchLogin(action: IAuth.ILogin) {
	const callback = action.payload;
	try {
		const { data } = yield call(axios, action.request);
		yield put(actions.loginSuccess({ email: data.email, token: data.token }));
		callback();
	} catch ({ response }) {
		let error = response ? response.data.message : null;

		yield put(actions.loginFailure(error));
	}
}

function* fetchForgetPassword(action: IAuth.IForgetPassword) {
	const callback = action.payload;
	try {
		yield call(axios, action.request);
		yield call(callback);
	} catch ({ response }) {
		const error = response ? response.data.message : null;
		yield put(actions.forgotPasswordMessage(error));
	}
}

function* fetchResetPassword(action: IAuth.IResetPassword) {
	const callback = action.payload;
	try {
		yield call(axios, action.request);
		yield call(callback);
	} catch ({ response }) {
		let error = response ? response.data.message : null;
		yield put(actions.forgotPasswordFailure(error));
	}
}

function* fetchUserData(action: IAuth.IGetUser) {
	try {
		const { data } = yield call(axios, action.request);
		yield put(actions.getUserSuccess(data.user));
	} catch (e) {}
}

function* fetchUserProfileData(action: IAuth.IGetUserProfile) {
	const callback = action.payload;
	try {
		const { data } = yield call(axios, action.request);
		yield put(actions.getUserSuccess(data.user));
		callback();
	} catch ({ response }) {
		const error = response ? response.data.message : null;
		yield put(actions.UserProfileFailure(error));
	}
}

function* fetchDeleteUser(action: IAuth.IDeleteUser) {
	try {
		yield call(axios, action.request);
		yield put(actions.logout());
	} catch (e) {}
}

function* authSaga() {
	yield takeLatest(authActionTypes.LOGIN_REQUEST, fetchLogin);
	yield takeLatest(authActionTypes.FORGOT_PASSWORD_REQUEST, fetchForgetPassword);
	yield takeLatest(authActionTypes.RESET_PASSWORD_REQUEST, fetchResetPassword);
	yield takeLatest(authActionTypes.GET_USER, fetchUserData);
	yield takeLatest(authActionTypes.USER_PROFILE_REQUEST, fetchUserProfileData);
	yield takeLatest(authActionTypes.DELETE_USER_REQUEST, fetchDeleteUser);
}

export default authSaga;
