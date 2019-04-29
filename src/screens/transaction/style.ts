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
