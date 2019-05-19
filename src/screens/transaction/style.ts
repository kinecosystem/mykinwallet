import styled, { css } from 'styled-components';
import media from 'common/breakpoints';
import { grid } from 'common/mixin';

export const formContainer = styled.div`
	header {
		/* margin-bottom: 29px; */
	}
`;

export const form = styled.form`
	/* margin-top: 20px; */
	${grid('0px', 'initial', 'flex-start', 'auto', 'auto')}
`;

export const HeaderContainer = styled.div`
	display: none;
	${media.sm`
		display:flex;
		margin-bottom: 24px;
	`}
`;

export const ButtonContainer = styled.div`
	margin-top: 34px;
`;

export const TransactionStyled = styled.div`
	position: relative;
`;
export const GrayedArea = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 2;
	background: rgba(255, 255, 255, 0.8);
	display: ${({ visible }) => (visible ? 'block' : 'none')};
`;
