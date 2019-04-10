export interface IActionsPayload {
	callback: Function;
}
export interface IActionRequest {
	url: string;
	method: string;
	data?: any;
}
