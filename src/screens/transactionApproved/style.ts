import styled from 'styled-components';
import media from 'common/breakpoints';

export const ApprovedPaymentStyled = styled.div`
	header {
		margin-bottom: 24px;
	}
	section {
		p {
			margin: 0;
			&.bold {
				font-family: SailecMedium;
			}
		}
	}
`;

export const StartOver = styled.div`
	color: ${({ theme }) => theme.purple};
	margin-top: 48px;
	cursor: pointer;
	${({ theme }) => theme.h6.mobile};
	${media.lg`
	
		${({ theme }) => theme.h6.desktop};
	`}
`;
