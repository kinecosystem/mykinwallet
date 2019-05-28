import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import * as Styled from './style';

export interface ITxtProps extends WrappedFieldProps {
	label?: string;
	subLabel?: string;
	placeholder?: string;
	borderColor?: string;
	errorColor?: string;
	errorBorderColor?: string;
	errorFontStyle?: string;
	errorFontWeight?: string;
	inputColor?: string;
	outLineFocusColor?: string;
	inputBackgroundColor?: string;
	inputValueBackgroundColor?: string;
	inputDisabledBackgroundColor?: string;
	inputDisabledColor?: string;
	placeholderColor?: string;
	bottomLabelBold?: string;
	bottomLabelRegular?: string;
	maxlength?: number;
	max?: number;
	min?: number;
	type?: string;
	pattern?: string;
	step?: string;
	special?: boolean;
	notGroup?: boolean;
}

const formInput = ({
	input,
	meta: { submitFailed, touched, error },
	maxlength,
	subLabel,
	label,
	placeholder,
	borderColor,
	outLineFocusColor,
	inputColor,
	inputBackgroundColor,
	inputValueBackgroundColor,
	inputDisabledBackgroundColor,
	placeholderColor,
	errorColor,
	errorFontStyle,
	errorFontWeight,
	errorBorderColor,
	bottomLabelBold,
	bottomLabelRegular,
	type,
	max,
	min,
	step,
	pattern,
	special,
	notGroup
}: ITxtProps) => {
	const outLineColor = touched && error ? errorBorderColor : borderColor;
	return (
		<>
			<Styled.group notGroup={notGroup}>
				<Styled.formLabel special={special} inputColor={inputColor}>
					{label}
					{input.name === 'kinAmount' && <Styled.subLabel>{subLabel}</Styled.subLabel>}
				</Styled.formLabel>
				<Styled.input
					{...input}
					value={input.value}
					autoComplete="off"
					placeholder={placeholder}
					borderColor={outLineColor}
					outLineFocusColor={outLineFocusColor}
					inputColor={inputColor}
					inputBackgroundColor={inputBackgroundColor}
					inputValueBackgroundColor={inputValueBackgroundColor}
					inputDisabledBackgroundColor={inputDisabledBackgroundColor}
					placeholderColor={placeholderColor}
					maxlength={maxlength}
					type={type}
					max={max}
					min={min}
					step={step}
					pattern={pattern}
				/>
				{input.name === 'memo' && (
					<Styled.bottomLabel>
						<b>{bottomLabelBold}</b>
						{bottomLabelRegular}
					</Styled.bottomLabel>
				)}
			</Styled.group>
			{touched &&
				(error && (
					<Styled.errorMsg errorColor={errorColor} errorFontStyle={errorFontStyle} errorFontWeight={errorFontWeight}>
						{error}
					</Styled.errorMsg>
				))}
		</>
	);
};

export default formInput;
