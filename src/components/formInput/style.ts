import styled, { css } from 'styled-components';
import { transactionFormBottomMargins } from './../../style/theme/generalVariables';
import media from 'common/breakpoints';
import { grid } from 'common/mixin';

export const group = styled.div`
	position: relative;
	${grid('6px', 'initial', 'flex-start', 'auto', 'auto')}
	margin-top:34px;
`;

export const formLabel = styled.label`
	font-size: 14px;
	letter-spacing: 0.3px;
	color: ${props => props.inputColor};
	// was absolute
	position: relative;
	pointer-events: none;
	// was 11px
	top: unset;
	// was 15px
	left: 0;
	transition: 0.2s ease all;
`;

export const subLabel = styled.div`
	font-weight: 600;
	font-style: italic;
	font-stretch: normal;
	line-height: 1.58;
	letter-spacing: 0.3px;
	margin-top: 4px;
`;

export const bottomLabel = styled.div`
	font-size: 12px;
	font-style: italic;
	line-height: 1.58;
	letter-spacing: 0.3px;
	// was -25px
	margin-top: 0;
	color: ${({ theme }) => theme.blackish};
`;

export const input = styled.input.attrs({
	maxLength: ({ maxlength }) => maxlength,
	max: ({ max }) => max,
	min: ({ min }) => min,
	pattern: ({ pattern }) => pattern
})`
  background-color: ${({ inputBackgroundColor }) => inputBackgroundColor};
	border: 1px solid ${props => props.borderColor};
	border-radius: 2px;
  color: ${props => props.inputColor};
	letter-spacing: 0.4px;
  &:focus {
    outline: none !important;
		
    border-color: ${props => props.outLineFocusColor};
		background: ${({ inputValueBackgroundColor }) => inputValueBackgroundColor};
  };

	/* margin-bottom: ${({ name }) => (transactionFormBottomMargins[name] ? transactionFormBottomMargins[name] : '34px')}; */
	font-size: 16px;
	height: 42px;
	width: calc(100% - 16px);
	padding-left: 12px;
	font-family: primaryFont;

  ${({ disabled, inputDisabledColor, inputDisabledBackgroundColor }) =>
		disabled &&
		css`
			background: ${inputDisabledBackgroundColor};
			color: ${inputDisabledColor};
			-webkit-text-fill-color: ${inputDisabledColor};
			-webkit-opacity: 1;
		`};

  & ~ ${formLabel} {
    ${({ name }) =>
			css`
				top: ${name === 'kinAmount' ? '-39px' : '-21px'};
				left: 1px;
				font-size: 12px;

				@media (max-width: 768px) {
					top: ${name === 'kinAmount' ? '-33px' : '-14px'};
					font-size: 11px;
					line-height: 1;
					letter-spacing: 0.8px;
				}
			`}


  &::placeholder {
		color: ${props => props.placeholderColor};
		font-size: 16px;
		letter-spacing: 0.4px;
  };

  &::-webkit-input-placeholder  {
    padding-top: 5px;
	};

	::-webkit-credentials-auto-fill-button {
    visibility: hidden;
    pointer-events: none;
    position: absolute;
    right: 0;
	};
`;

export const errorMsg = styled.div`
	font-size: 12px;
	font-style: ${({ errorFontStyle }) => errorFontStyle};
	font-weight: ${({ errorFontWeight }) => errorFontWeight};
	line-height: 1.83;
	letter-spacing: 0.6px;
	color: ${props => props.errorColor};
	position: relative;
	overflow: hidden;
`;
