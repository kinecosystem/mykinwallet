import type from '../../actions/errors/types';

const initialState = {
	errors: []
};

let filterDuplicate = errors => errors.filter((v, i) => errors.indexOf(v) === i);

export default function(state = initialState, action: any) {
	switch (action.type) {
		case type.SET_TEMPLATE_ERROR: {
			return { ...state, errors: [...filterDuplicate([...action.payload])] };
		}
		case type.RESET_TEMPLATE_ERROR: {
			return { ...state, errors: [] };
		}
		default:
			return state;
	}
}
