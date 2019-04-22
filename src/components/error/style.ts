import styled from 'styled-components';
import media from 'common/breakpoints';
import { grid } from 'common/mixin';

export const ErrorContainer = styled.div`
	${grid('12px', 'initial', 'initial', 'auto', 'auto')}
	margin-bottom: 36px;
	${media.lg`
	    grid-gap: 18px;
        margin-bottom: 42px;
    `}
`;
export const ErrorItem = styled.div`
	background: ${({ theme }) => theme.bodyColor};
	padding: 20px;
	color: ${({ theme }) => theme.volcanoRed};
`;
