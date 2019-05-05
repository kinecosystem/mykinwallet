import styled from 'styled-components';
import media from 'common/breakpoints';
import { grid } from 'common/mixin';

export const ItemsContainer = styled.div`
	${grid('24px', 'initial', 'initial', 'auto', 'auto')}
	${media.sm`
	    ${grid('18px', 'initial', 'initial', 'repeat(2, 1fr)', 'auto')}

    `}
`;

export const HeaderContainer = styled.div`
	${grid('6px', 'initial', 'initial', 'auto', 'auto')};
	${media.lg`
		${grid('12px', 'initial', 'initial', 'auto', 'auto')};
	color: ${({ theme }) => theme.blackish};
`}
`;
