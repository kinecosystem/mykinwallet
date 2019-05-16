import styled from 'styled-components';
import media from 'common/breakpoints';
import { grid } from 'common/mixin';

export const Item = styled.div`
	border: solid 2px ${({ theme }) => theme.blackish};
	border-radius: 5px;
	position: relative;
	height: 186px;
	color: ${({ theme }) => theme.blackish};
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
	> div {
		> div {
			font-family: SailecMedium;
			font-size: 17px;
			line-height: 1;
			${media.lg`
				font-size:19px;
				line-height:24px;
				`}

			br {
				display: none;
				${media.sm`
						display:block;
				`}
			}
		}
	}
	${media.sm`
        height: 211px;
        width: 180px;
    `}
	${media.lg`
        font-size:19px;
        height: 226px;
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
	font-family: SailecLight !important;
	font-size: 10px;
	line-height: 11px;
	position: absolute;
	bottom: 8px;

	${media.lg`
			bottom:10px;
    `}
	${media.xl`
			bottom:15px;
    `}
`;
