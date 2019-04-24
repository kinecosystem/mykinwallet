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
}

const formInput = ({
	input,
	meta: { submitFailed, touched, error },
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
	bottomLabelRegular
}: ITxtProps) => {
	const outLineColor = touched && error ? errorBorderColor : borderColor;
	return (
		<>
			<Styled.group>
				<Styled.formLabel inputColor={inputColor}>
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
