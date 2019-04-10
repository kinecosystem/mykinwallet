import { takeEvery, call, put } from 'redux-saga/effects';
import { categoriesActionTypes } from '../../actionConsts/site/categories';
import { navigate } from 'gatsby';
import * as actions from '../../actions/site/categories.action';
import * as apiCall from '../../../utils/site/apiRoutes';

function* fetchCategories(action: any) {
	try {
		const { data } = yield call(apiCall.fetchCategories);

		yield put(actions.setCategories(data));
	} catch ({ response }) {
		if (!response || response.status === 500) {
			navigate('/error', {
				state: { error: response ? response.data.message : null }
			});
		}
	}
}

function* CategoriesSaga() {
	yield takeEvery(categoriesActionTypes.FETCH_CATEGORIES, fetchCategories);
}

export default CategoriesSaga;
