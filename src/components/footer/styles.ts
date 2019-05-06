import styled, { css } from 'styled-components';
import media from 'common/breakpoints';

interface IProps {
	title?: boolean;
	subscribe?: boolean;
}

interface IP {
	value: string;
}

export const link = styled.a`
	text-decoration: none;
	&:focus {
		text-decoration: none;
	}
`;
export const arrow = styled.div`
	position: absolute;
	cursor: pointer;
	right: 20px;
	top: 66px;

	@media (max-width: 768px) {
		right: 63px;
	}
	@media (max-width: 596px) {
		right: 70px;
		top: 60px;
	}
`;

export const mainContainer = styled.div`
	a {
		text-decoration: none;
	}
	background: white;
	position: relative;
	padding: 45px 0;
	@media (min-width: 1367px) {
		margin: auto;
	}
	${media.lg`
		padding: 36px 0;
		`}

	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const footerTop = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	@media (max-width: 810px) {
		position: relative;
		margin-bottom: 0;
	}

	@media (max-width: 768px) {
		flex-direction: column;
		margin-bottom: 0;
	}
	@media (max-width: 320px) {
		padding-top: 64px;
	}
`;

export const iconBox = styled.div`
	cursor: pointer;
	margin-top: -11px;
	@media (max-width: 768px) {
		width: 100%;
		margin-bottom: 36px;
		margin-left: -11px;
	}

	@media (max-width: 420px) {
		margin-bottom: 28px;
		margin-left: 0px;
	}
`;

export const footerLogo = styled.img`
	height: 75px;
	width: 75px;
	margin-left: -10px;
`;

export const footerTitle = styled.p`
	font-size: 20px;
	font-weight: bold;
	line-height: 1.1;
	letter-spacing: 0.5px;
	color: ${props => props.theme.darkText};
	font-family: sailecBold;

	@media (max-width: 768px) {
		font-size: 18px;
	}
`;

export const footerTitleLinks = styled.p`
	font-size: 14px;
	line-height: 1.6;
	letter-spacing: 0.4px;
	color: ${props => props.theme.darkText};
	margin-bottom: 12px;

	&:hover {
		opacity: 0.35;
	}

	@media (max-width: 768px) {
		font-size: 12px;
	}

	@media (max-width: 320px) {
		font-size: 13px;
		margin-bottom: 20px;
	}
`;

export const footerLeftLinks = styled.div`
	font-size: 12px;
`;

export const disappearingFooterLinks = styled(footerTitleLinks)`
	@media (max-width: 1366px) {
		display: none;
	}
`;

export const footerLeftBottom = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-gap: 2vw;
	@media (max-width: 768px) {
		margin-left: 0;
		font-size: 10px;
		letter-spacing: 0.3px;
	}

	* {
		font-size: 12px;

		@media (max-width: 992px) {
			font-size: 10px;
		}
	}
`;

export const footerLeftBottomWrapper = styled.div`
	display: flex;
	flex-direction: row;
	max-width: 100vw;
	justify-content: space-between;

	@media (max-width: 768px) {
		flex-direction: row;
	}

	@media (max-width: 576px) {
		flex-direction: column;
		height: 65px;
	}
`;

export const footerTitleModified = styled(footerTitle)`
	font-size: 18px;
	line-height: 1.33;
	letter-spacing: 0.5px;
	color: ${props => props.theme.darkText};
	margin-bottom: 21px;
	font-weight: normal;
	font-family: primaryFont;

	@media (max-width: 992px) {
		font-size: 15px;
		display: flex;
		justify-content: space-between;
	}

	@media (max-width: 596px) {
		font-size: 13px;
	}
`;

export const footerTitleCopyright = styled(footerTitle)`
	font-size: 10px;
	line-height: 1.33;
	letter-spacing: 0.5px;
	color: ${props => props.theme.darkText};
	margin-bottom: 21px;
	margin-top: 2px;
	font-weight: normal;
	font-family: primaryFont;

	@media (max-width: 992px) {
		font-size: 10px;
		display: flex;
		margin-top: 2px;
		justify-content: space-between;
		margin-left: 17%;
	}

	@media (max-width: 950px) {
		flex-direction: column;
	}

	@media (max-width: 768px) {
		margin-left: 0px;
	}

	@media (max-width: 596px) {
		font-size: 10px;
		margin-bottom: 0px;
		margin-left: 0px;
	}
`;
export const iconsContainer = styled.div`
	width: 104px;

	@media (max-width: 992px) {
		padding-left: 0vw;
		margin-bottom: 47px;
	}
	@media (max-width: 900px) {
		width: 300px;
	}

	@media (max-width: 768px) {
		margin: 2% 0 8%;
		padding-left: 0;
		position: initial;
	}

	@media (max-width: 320px) {
		margin: -5px 0 51px 0;
	}
`;
export const footerIcons = styled.div`
	width: 104px;
	display: flex;
	justify-content: space-between;
`;

export const divContainer = styled.div`
	@media (max-width: 992px) {
		margin: 0 2% 157px 2%;
	}
	@media (max-width: 768px) {
		width: 50%;
		margin-bottom: 0;
		&:not(:last-child) {
			margin-right: 0px;
		}
	}

	@media (max-width: 320px) {
		margin: 0 0 0 2px;
	}
`;

export const subscribe = styled.div`
	max-width: 295px;
	position: relative;
	@media (max-width: 768px) {
		margin: 56px 0 8%;
	}
	@media (max-width: 596px) {
		margin-bottom: 56px;
	}
`;

export const linksContainer = styled.div`
	display: flex;
	justify-content: space-between;
	min-width: 13vw;
	width: 23vw;
	@media (max-width: 992px) {
		width: 33vw;
	}

	@media (max-width: 768px) {
		display: flex;
		justify-content: unset;
		width: 67%;
	}

	@media (max-width: 420px) {
		width: 100%;
	}

	@media (max-width: 320px) {
		max-width: unset;
		margin-bottom: 65px;
	}
`;

export const mailInput = styled.input`
	width: 294px;
	height: 55px;
	border-radius: 2px;
	border: 2px solid #000;
	padding-left: 15px;
	color: #1f1f1f;

	&:focus {
		outline: none;
	}

	&:disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	&::-webkit-input-placeholder {
		/* Chrome/Opera/Safari */
		font-size: 12px;
		color: #9b9b9b;
		font-weight: normal;
		line-height: 1.33;
		letter-spacing: 0.5px;
		font-family: primaryFont;
	}

	.sending & {
		opacity: 0.5;
		pointer-events: none;
	}

	.failure & {
		border-color: #db497b;
	}

	.success & {
		border-color: #1dc2a4;
	}

	@media (max-width: 992px) {
		width: 226px;
	}
	@media (max-width: 596px) {
		width: 246px;
	}
`;
