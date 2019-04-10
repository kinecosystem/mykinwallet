import { statsActionTypes } from '../../actionConsts/site/stats';
import { IState } from '../../interfaces/site/stats';

const initalState: IState = {
	date: '',
	currentStatus: '',
	dateSummary: [],
	valueByDate: [],
	valueByApp: [],
	statusVaule: 1
};

export default function(state = initalState, action: any) {
	switch (action.type) {
		case statsActionTypes.FETCH_DATA_REFRESHED_TIME_SUCCESS: {
			const { status_text, status_vaule } = action.payload.data;
			return {
				...state,
				currentStatus: status_text,
				statusVaule: status_vaule
			};
		}
		case statsActionTypes.FETCH_SUMMARY_DATA_SUCCESS: {
			let date = '',
				dateSummary = [];
			action.payload.data.map(item => {
				if (item.header.toLowerCase().includes('data refreshed at:')) {
					date = item.value;
				} else {
					dateSummary.push(item);
				}
			});
			return { ...state, dateSummary, date };
		}
		case statsActionTypes.FETCH_CHARTS_DATA_SUCCESS: {
			let valueByApp = [],
				valueByDate = [];
			action.payload.data.map(data => {
				if (data.WidgetType === 'Table') {
					valueByApp = data.value;
				} else if (data.WidgetType === 'Line Chart') {
					valueByDate = data.value;
				}
			});
			return { ...state, valueByApp, valueByDate };
		}
		case statsActionTypes.FETCH_CHARTS_DATA_FAILURE: {
			return state;
		}
		default: {
			return state;
		}
	}
}
