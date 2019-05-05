import type from './types';

export const setTemplateErrors = payload => ({
	type: type.SET_TEMPLATE_ERROR,
	payload
});
export const resetTemplateErrors = payload => ({
	type: type.RESET_TEMPLATE_ERROR,
	payload
});
