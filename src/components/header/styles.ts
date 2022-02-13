import styled, { css } from 'styled-components';
import { ITheme } from '../../style/theme';
import { grid } from 'common/mixin';
import media from 'common/breakpoints';

interface IProps extends ITheme {
	background: string;
	color?: string;
}

export const header = styled.div`
	${({ isOnTop }) =>
		isOnTop
			? css`
					background-color: ${(props: IProps) => (props.background ? props.background : props.theme.primaryColor)};
			  `
			: css`
					background-color: #ffffff;
					border-radius: 2px;
					box-shadow: 0 0 4px 0 rgba(146, 146, 146, 0.5);
			  `};

	top: 0;
	z-index: 1111;
	height: 118px;
	position: sticky;
	width: 100%;
	/* transition: all 0.3s ease-in; */

	@media (max-width: 1366px) {
	}

	@media (max-width: 992px) {
		height: 98px;
	}

	@media (max-width: 768px) {
	}
`;

export const headerContainer = styled.div`
	margin: 0 auto;
	// max-width: 1330px;
	height: inherit;
	display: flex;
	align-items: center;
	justify-content: space-between;
	a:link {
		color: transparent;
		text-decoration: none;
	}

	// @media (max-width: 1366px) {
	//   max-width: 1228px;
	//   margin: 0 72px;
	// }

	// @media (max-width: 992px) {
	//   height: 98px;
	//   margin: 0 31px;
	// }

	// @media (max-width: 320px) {
	//   margin: 0 12px;
	// }
`;
export const headerIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
`;

export const headerBanner = styled.div`
	text-align: center;
	background: red;
	color: white;
	font-size: larger;
	padding: 15px 0 10px;
	a {
		color: white;
		text-decoration: underline;
	}
	span {
		margin: 0 10px;
	}
`;

export const icon = styled.img`
	width: 65px;
	height: 65px;
	margin: 1px 10px 1px -2px;

	@media (max-width: 992px) {
		width: 61px;
		height: 61px;
		margin: 1px 10px 1px -2px;
	}
	@media (max-width: 768px) {
		width: 56px;
		height: 56px;
	}

	@media (max-width: 320px) {
		width: 69px;
		height: 66px;
		margin-left: -11px;
	}
`;

export const logoText = styled.p`
	text-transform: capitalize;
	letter-spacing: 0.4px;
	text-align: center;
	margin-bottom: 0;
	font-size: 14px;
	color: ${props => (props.isOnTop ? props.theme.ligthTextColor : props.theme.textColor)};

	transition: all 0.3s ease-in;
	@media (max-width: 768px) {
		display: none;
	}
`;

export const headerNev = styled.div`
	${grid('1em', 'initial', 'initial', 'auto auto', 'auto')}
`;
export const link = styled.a`
	font-weight: normal;
	transition: all 0.1s ease-in;
	&:hover {
		font-weight: bold;
	}
	&:focus {
		text-decoration: none;
	}
`;
export const nevLink = styled.p`
	font-size: 14px;
	line-height: 1.14;
	letter-spacing: 0.4px;
	text-align: center;
	margin-bottom: 0;
	color: ${props => (props.isOnTop ? props.theme.ligthTextColor : props.theme.textColor)};

	transition: all 0.3s ease-in;

	&:hover {
		opacity: 0.35;
	}

	@media (max-width: 768px) {
		display: none;
	}
`;

//mobile menu

export const navContainer = styled.ul`
	height: 0;
	list-style: none;
	padding: 0;
	overflow: hidden;
	top: 90px;
	position: absolute;
	width: 100vw;
	background-color: rgba(250, 250, 250, 0.97);
	box-shadow: 0 0 4px rgba(146, 146, 146, 0.5);
	transition: all 0.3s ease-in;
	display: none;
	@media (max-width: 768px) {
		display: block;
	}
	top: 82px;
	left: -5.5%;
	${media.sm`
    top: 82px;
    left: -36px;
    
    `}
	${({ isOpen }) =>
		isOpen &&
		css`
			height: 133px;
			transition: all 0.3s ease-in;
		`}
`;
export const navItem = styled.li`
	display: flex;
	margin: 0 33px;
	align-items: center;
	height: 67px;
	cursor: pointer;
	border-bottom: 1px solid #a6a6a6;
`;

export const navItemText = styled.p`
	line-height: 40px;
	margin: 0;
	text-overflow: ellipsis;
	font-size: 19px;
	color: ${props => props.theme.darkText};

	${({ selected }) =>
		selected &&
		css`
			font-weight: bold;
		`}
`;
