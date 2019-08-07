import styled from 'styled-components';
import { grid } from 'common/mixin';
import media from 'common/breakpoints';

export const TitleContainer = styled.div`
	${grid('0em', 'initial', 'flex-start', 'auto', 'auto')}
	color: white;
	div {
		color: white;
		p {
			letter-spacing:0.42px;
			&:first-of-type{
				margin-bottom: 18px;
				${media.md`
					margin-bottom: 60px;
				
				`}
			}
			${media.md`
				max-width:222px;
			`}
			${media.lg`
				max-width:279px;
			`}
			${media.xl`
				max-width:453px;
			`}
		}
	}
`;
