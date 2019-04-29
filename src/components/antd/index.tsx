import React, { useEffect, useState } from 'react';
import { CheckboxStyle, SelectStyle, InputStyle } from './style';
import { Select, Checkbox, Input } from 'antd';

import downArrow from 'images/arrow_down.svg';

export const CheckboxPremade = props => (
	<CheckboxStyle>
		<Checkbox {...props}>
			<span className="text-styleing">{props.children}</span>
		</Checkbox>
	</CheckboxStyle>
);

const Option = Select.Option;

export const SelectPremade = props => {
	const parseOptions = aOptions => {
		return aOptions.map((option, i) => {
			return (
				<Option key={`${option}_${i}`} value={option}>
					{option}
				</Option>
			);
		});
	};
	return (
		<SelectStyle>
			<Select placeholder={props.placeholder} suffixIcon={<img src={downArrow} alt="arrow" />} defaultValue={props.defaultValue} onChange={props.onChange}>
				{parseOptions(props.list)}
			</Select>
		</SelectStyle>
	);
};

export const InputPremade = props => (
	<InputStyle>
		<Input {...props} />
	</InputStyle>
);
