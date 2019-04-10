import { authActionTypes } from '../../actionConsts/auth';
import { IActionRequest, IActionsPayload } from './../../interfaces/auth/api';

export interface ILogin {
	type: authActionTypes;
	payload: IActionsPayload;
	request: IActionRequest;
}

export interface IForgetPassword {
	type: authActionTypes.FORGOT_PASSWORD_REQUEST;
	payload: IActionsPayload;
	request: IActionRequest;
}

export interface IResetPassword {
	type: authActionTypes.RESET_PASSWORD_REQUEST;
	payload: IActionsPayload;
	request: IActionRequest;
}

export interface IGetUser {
	type: authActionTypes.GET_USER;
	request: IActionRequest;
}

export interface IGetUserProfile {
	type: authActionTypes.USER_PROFILE_REQUEST;
	request: IActionRequest;
}

export interface IDeleteUser {
	type: authActionTypes.DELETE_USER_REQUEST;
	payload: IActionsPayload;
	request: IActionRequest;
}

export type AuthActions = ILogin;
