import styled from 'styled-components';
import media from 'common/breakpoints';
import { grid } from 'common/mixin';

export const RecentBlockhashContainer = styled.div`
	border-top: 2px;
	border-bottom: 2px;
	border-right: 0;
	border-left: 0;
	border-style: solid;
	border-color: ${({ theme }) => theme.purple};
	background: ${({ theme }) => theme.purpleTransed};
	margin-bottom: 56px;
	${media.sm`
	    margin-bottom: 66px;
    `}
	${media.lg`
	    margin-bottom: 48px;
    `}
`;

export const RecentBlockhashInfoItem = styled.div`
	padding: 18px;
	color: ${({ theme }) => theme.blackish};

	.WalletInfoItem__container {
		span:not(.recent-blockhash) {
			font-family: SailecMedium;
			font-size: 17px;
			${media.sm`
			font-size: 19px;
                `}
		}
		word-wrap: break-word;
		word-break: break-all;
		${grid('4px', 'initial', 'initial', '100%', 'auto')}
		${media.sm`
			
			${grid('6px', 'initial', 'initial', '100%', 'auto')}
			`}
	}
`;
