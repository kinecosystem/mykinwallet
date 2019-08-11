import React from 'react';
import { JsxElement } from 'typescript';
import {Fee} from './style'

const inputFields: {
	name: string;
	label: JsxElement | string;
	subLabel?: string;
	bottomLabelBold?: string;
	bottomLabelRegular?: string;
	type?: string;
	placeholder: string;
	maxlength?: number;
	max?: number;
	min?: number;
	step?: string;
}[] = [
	{
		name: 'destinationAccount',
		label: 'Destination account*',
		placeholder: 'Enter destination account address'
	},
	{
		name: 'kinAmount',
		type: 'number',
		label: 'Kin Amount*',
		subLabel: <Fee> The network base fee is 100 Quarks <br/> (0.001 kin) </Fee>,
		placeholder: 'Max amount 100M Kin',
		max: 100000000,
		min: 0.1,
		step: 'any',
		maxlength: 9
	},
	{
		name: 'memo',
		label: 'Memo',
		bottomLabelBold: 'Please Note: ',
		bottomLabelRegular:
			'Some exchanges or swap companies require using a memo. Please check the relevant destination site for specific instructions.',
		placeholder: 'Up to 28 chracters',
		maxlength: 28
	}
];

export default inputFields;
