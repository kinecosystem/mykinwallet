import { statsActionTypes } from '../../actionConsts/site/stats';

export const getDataRefreshedTime = () => {
	return {
		type: statsActionTypes.FETCH_DATA_REFRESHED_TIME
	};
};

export const getDataSummary = () => {
	return {
		type: statsActionTypes.FETCH_DATA_SUMMARY
	};
};

export const getChartsData = () => ({
	type: statsActionTypes.FETCH_CHARTS_DATA
});
