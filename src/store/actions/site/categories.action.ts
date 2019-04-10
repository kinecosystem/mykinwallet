import { categoriesActionTypes } from '../../actionConsts/site/categories';
import { ICategory } from '../../interfaces/site/categories';

export const fetchCategories = () => ({
	type: categoriesActionTypes.FETCH_CATEGORIES
});

export const setCategories = (categories: ICategory[]) => ({
	type: categoriesActionTypes.SET_CATEGORIES,
	payload: categories
});

export const selectCategory = (category: ICategory) => ({
	type: categoriesActionTypes.SELECT_CATEGORY,
	payload: category
});
