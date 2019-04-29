import styled from 'styled-components';
import media from 'common/breakpoints';

export const ReviewPaymentStyled = styled.div`
	header {
		margin-bottom: 24px;
	}
	button {
		margin-top: 30px;
	}
`;
export const GoBack = styled.div`
	margin-bottom: 54px;
	color: ${({ theme }) => theme.purple};
	cursor: pointer;
	/* returns font size*/
	${({ theme }) => theme.h6.mobile};
	${media.md`
    /* returns font size*/
	    ${({ theme }) => theme.h6.desktop};
    `}
`;
