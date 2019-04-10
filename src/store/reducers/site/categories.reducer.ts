import { categoriesActionTypes } from '../../actionConsts/site/categories';
import { ICategorieslState } from '../../interfaces/site/categories';

const initalState: ICategorieslState = {
	categories: [],
	selectedCategory: undefined
};

export default function(state = initalState, action: any) {
	switch (action.type) {
		case categoriesActionTypes.SET_CATEGORIES: {
			return {
				selectedCategory: action.payload[0],
				categories: action.payload
			};
		}

		case categoriesActionTypes.SELECT_CATEGORY: {
			return {
				...state,
				selectedCategory: action.payload
			};
		}

		default: {
			return { ...state };
		}
	}
}
