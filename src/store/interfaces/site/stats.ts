export interface ISummary {
	readonly header: string;
	readonly value: number;
	readonly toolTip: string;
}

export interface IValue {
	Value: number;
	MAS_rnk: number;
	Application: string;
	MAS_rnk_yestarday: number;
}
export interface IDate {
	application: string;
	date: number;
	value: number;
}

export interface IState {
	date: string;
	currentStatus: string;
	dateSummary: ISummary[];
	valueByDate: IDate[];
	valueByApp: IValue[];
	// lineCarts: {},
	// barCharts: {},
	statusVaule: number;
}
