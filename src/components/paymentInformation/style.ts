import styled from 'styled-components';
import media from 'common/breakpoints';
import { grid } from 'common/mixin';

export const PaymentInfoStyled = styled.div`
	padding: 18px 25px;
	background: ${({ theme }) => theme.silverado};
	margin-bottom: 30px;
	border-top: 1px solid #d8d8d8;
	border-bottom: 1px solid #d8d8d8;
`;

export const Item = styled.div`
	${grid('32px', 'flex-start', 'center', '130px auto', 'auto')}
	margin-bottom: 20px;
	word-break: break-all;
	color: ${({ theme }) => theme.blackish};
	font-size: 14px;
	line-height: 22px;
	span {
		font-size: 16px;
		line-height: 27px;
		font-family: SailecMedium;
	}
	div[data-item='balance'] {
		align-self: flex-start;
		margin-top: 5px;
	}
	summary {
		word-break: keep-all;
		font-size: 10px;
		line-height: 15px;
	}
`;
