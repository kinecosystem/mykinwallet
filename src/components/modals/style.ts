import media from 'common/breakpoints';
import { grid, flexRow } from 'common/mixin';
import styled from 'styled-components';

export const ModalStyled = styled.div``;

export const ModalStyledX = styled.div`
	cursor: pointer;
	img {
		width: 29px;
		height: 29px;
		${media.sm`
            width: 23px;
		    height: 23px;
        `}
		${media.md`
            width: 30px;
		    height: 30px;
        `}
	}
`;
export const ModalHeader = styled.header`
	${flexRow('space-between', 'center')}
`;
