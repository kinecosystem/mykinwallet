import React, { useState } from 'react';
import { CheckboxStyle, SelectStyle, InputStyle } from './style';
import { Select, Checkbox, Input } from 'antd';

import downArrow from 'images/arrow_down.svg';
//CHECKBOX\\

export const CheckboxPremade = ({ onChange, children }) => (
	<CheckboxStyle>
		<Checkbox onChange={onChange} />
		<div className="text-styleing">{children}</div>
	</CheckboxStyle>
);

const Option = Select.Option;
//SELECT\\
export const SelectPremade = props => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const parseOptions = aOptions => {
		return aOptions.map((option, i) => {
			return (
				<Option key={`${option}_${i}`} value={option}>
					{option}
				</Option>
			);
		});
	};
	const onDropdownVisibleChange = bool => {
		setIsDropdownOpen(bool);
	};
	return (
		<SelectStyle>
			<Select
				onDropdownVisibleChange={onDropdownVisibleChange}
				placeholder={props.placeholder}
				suffixIcon={<img data-rotate={isDropdownOpen} src={downArrow} alt="arrow" />}
				defaultValue={props.defaultValue}
				onChange={props.onChange}
			>
				{parseOptions(props.list)}
			</Select>
		</SelectStyle>
	);
};

//INPUT\\

export const InputPremade = props => (
	<InputStyle>
		<Input {...props} />
	</InputStyle>
);

