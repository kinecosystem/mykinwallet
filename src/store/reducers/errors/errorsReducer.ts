import type from '../../actions/errors/types';

const initialState = {
	errors: ['asdas']
};

export default function(state = initialState, action: any) {
	switch (action.type) {
		case type.SET_TEMPLATE_ERROR: {
			return { ...state, errors: [...action.payload] };
		}
		default:
			return state;
	}
}