import styled from 'styled-components';
import media from 'common/breakpoints';
import { grid } from 'common/mixin';

export const Item = styled.div`
	border: solid 2px ${({ theme }) => theme.blackish};
	border-radius: 5px;
	height: 186px;
	width: 259px;
	font-size: 17px;
	line-height: 28px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: auto;
	cursor: pointer;
	&:hover {
		border-color: ${({ theme }) => theme.purple};
		background: rgba(167, 147, 223, 0.15);
	}
	div {
		font-family: SailecMedium;
	}
	${media.sm`
        height: 180px;
        width: 180px;
    `}
	${media.lg`
        font-size:19px;
        height: 216px;
        width: 216px;
    `}
    img {
		width: 90px;
		height: 90px;
		margin-bottom: 23px;
	}
`;

export const Alert = styled.div`
	color: ${({ theme }) => theme.volcanoRed};
	font-size: 10px;
	line-height: 11px;
`;
