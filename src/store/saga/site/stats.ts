import { takeEvery, call, put } from 'redux-saga/effects';
import { statsActionTypes } from '../../actionConsts/site/stats';
import { fetchStatserCharts, fetchSummaryDataApi, fetchStatsDataRefreshedTime } from '../../../utils/site/apiRoutes';

function* fetchDataRefreshedTime() {
	try {
		const data = yield call(fetchStatsDataRefreshedTime);
		yield put({
			type: statsActionTypes.FETCH_DATA_REFRESHED_TIME_SUCCESS,
			payload: data
		});
	} catch (e) {
		console.log(e);
	}
}

function* fetchStatsChart() {
	try {
		const data = yield call(fetchStatserCharts);
		yield put({
			type: statsActionTypes.FETCH_CHARTS_DATA_SUCCESS,
			payload: data
		});
	} catch (err) {
		yield put({
			type: statsActionTypes.FETCH_CHARTS_DATA_FAILURE,
			error: err
		});
	}
}

function* fetchSummaryData() {
	try {
		const data = yield call(fetchSummaryDataApi);
		yield put({
			type: statsActionTypes.FETCH_SUMMARY_DATA_SUCCESS,
			payload: data
		});
	} catch (e) {
		console.log(e);
	}
}

function* statsSaga() {
	yield takeEvery(statsActionTypes.FETCH_CHARTS_DATA, fetchStatsChart);
	yield takeEvery(statsActionTypes.FETCH_DATA_SUMMARY, fetchSummaryData);
	yield takeEvery(statsActionTypes.FETCH_DATA_REFRESHED_TIME, fetchDataRefreshedTime);
}

export default statsSaga;
