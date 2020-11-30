import React from 'react';
import { JsxElement } from 'typescript';
import {TransactionSubLabel} from './style'

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
		name: 'tokenAccount',
		label: 'Sender Token Account*',
		placeholder: 'Enter sender token account address'
	},
	{
		name: 'destinationAccount',
		label: 'Destination Account*',
		placeholder: 'Enter destination account address'
	},
	{
		name: 'kinAmount',
		type: 'number',
		label: 'Kin Amount*',
		placeholder: 'Max amount 100M Kin',
		max: 100000000,
		min: 1,
		step: 'any',
		maxlength: 9
	},
	{
		name: 'memo',
		label: 'Memo',
		bottomLabelBold: 'Please Note: ',
		bottomLabelRegular:
			'Some exchanges or swap companies require using a memo. Please check the relevant destination site for specific instructions.',
		placeholder: 'Memo text',
		maxlength: 28
	}
];

export default inputFields;
