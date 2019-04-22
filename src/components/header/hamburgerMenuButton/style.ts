import styled, { css } from 'styled-components';
import { ITheme } from '../../styles/theme/kin-theme';

//hamburger button & menu

export const topRightHamburger = styled.div`
	position: relative;
	display: none;
	cursor: pointer;
	@media (max-width: 768px) {
		margin-left: 40px;
		display: flex;
	}
`;

export const nav = styled.input.attrs((checked: boolean) => ({
	type: 'checkbox',
	id: 'menu',
	readOnly: true,
	checked
}))`
	display: none;
`;

export const navBtn = styled.label`
	transition: all 0.2s;
	background-color: inherit;
	margin-right: 30px;
	cursor: pointer;
	height: 2rem;
	transition: all 0.2s;
`;

export const navIcon = styled.span`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 30px;
	height: 3px;
	display: inline-block;
	&::before,
	&::after {
		content: '';
		position: absolute;
		left: 0;
		width: 30px;
		height: 3px;
		display: inline-block;
		transition: all 0.2s;
	}
	&,
	&::before,
	&::after {
		${({ isOnTop }) =>
			isOnTop
				? css`
						background-color: ${(props: ITheme) => props.theme.ligthTextColor};
				  `
				: css`
						background-color: ${(props: ITheme) => props.theme.textColor};
				  `};
	}
	&::after {
		top: 0.6rem;
	}
	&::before {
		top: -0.6rem;
	}
	&:hover &::after {
		top: 10px;
	}
	&:hover &::before {
		top: -10px;
	}
	${topRightHamburger}:hover &::after {
		top: 0.7rem;
	}
	${topRightHamburger}:hover &::before {
		top: -0.7rem;
	}
	${nav}:checked + ${navBtn} &::after {
		top: 0;
		transform: rotate(-135deg);
	}
	${nav}:checked + ${navBtn} &::before {
		top: 0;
		transform: rotate(135deg);
	}
	${nav}:checked + ${navBtn} & {
		background-color: transparent;
	}
`;
