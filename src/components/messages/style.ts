import styled from 'styled-components';
import media from 'common/breakpoints';
import { grid } from 'common/mixin';

export const ErrorContainer = styled.div`
	${grid('12px', 'initial', 'initial', 'auto', 'auto')}
	/* margin-bottom: ${({ active }) => (active ? '36px' : '0')} ; */
	${media.lg`
		grid-gap: 18px;
		/* margin-bottom: ${({ active }) => (active ? '42px' : '0')} ; */
    `}

`;

export const ErrorText = styled.div`
	${({ theme }) => theme.h6.mobile}
	${media.lg`
    ${({ theme }) => theme.h6.desktop}
    `}
    font-family:primaryFont;
`;

export const MessageBox = styled.div`
	background: ${({ theme }) => theme.bodyColor};
	padding: 20px;
	color: ${({ type, theme }) => (type === 'error' ? theme.volcanoRed : theme.blackish)};
	&:nth-last-child(1) {
		margin-bottom: 36px;
		${media.lg`
		margin-bottom: 42px;	
	`}
	}
	${({ infoBox }) =>
		infoBox &&
		`
		margin-bottom: 36px;
		${media.lg`
			margin-bottom: 42px;	
		`};
	`};
`;

export const MessageBoxTextOnly = styled.div`
	background: ${({ theme }) => theme.bodyColor};
	padding: 20px;
	color: ${({ type, theme }) => (type === 'error' ? theme.volcanoRed : theme.blackish)};
	/* margin-bottom: 36px; */
	p {
		margin: 0;
	}
`;
