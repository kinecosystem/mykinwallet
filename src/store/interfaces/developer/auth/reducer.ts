'use strict';
export interface IAuthState {
	email: string;
	token: string;
	error?: string;
	user: {
		name: string;
		company: string;
		phone: string;
		recieveNewsletter: boolean;
	};
	modalActive: boolean;
}
