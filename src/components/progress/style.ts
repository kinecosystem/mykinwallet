import styled from 'styled-components';
import media from 'common/breakpoints';

export const Step = styled.div`
	color: ${props => props.theme.purple};
`;

export const ProgressLineContainer = styled.div`
	margin-bottom: 36px;
	${media.lg`
        margin-bottom: 42px;
    `}
`;
