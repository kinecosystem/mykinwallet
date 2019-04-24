import styled from 'styled-components';
import media from 'common/breakpoints';
import { grid } from 'common/mixin';

export const WalletInfoContainer = styled.div`
	border-top: 2px;
	border-bottom: 2px;
	border-right: 0;
	border-left: 0;
	border-style: solid;

	border-color: ${({ theme }) => theme.purple};

	background: ${({ theme }) => theme.purpleTransed};
	${media.md`

    `}
	.mobileOnly {
		${media.lg`
             display:none;
        `}
	}
	.desktopOnly {
		display: none;
		${media.lg`
		${grid('12px', 'initial', 'initial', 'auto auto auto', 'auto')}
            display:grid;
        `}
	}
`;

export const WalletInfoItem = styled.div`
	padding: 18px;
	.WalletInfoItem__container {
		span:not(.wallet-address) {
			font-family: SailecMedium;
			font-size: 19px;
			${media.sm`
                font-size: 17px;
                `}
		}
		span.wallet-value {
			font-size: 14px;
			line-height: 18px;
			${media.sm`
                font-size: 25px;
                line-height:22px;
            `}
			margin-right:.3em;
		}
		word-wrap: break-word;
		word-break: break-all;
		${grid('1em', 'initial', 'initial', '100%', 'auto')}
	}
`;

export const Wallet_seperator = styled.div`
	height: 2px;
	background: ${({ theme }) => theme.purple};
`;
export const Wallet_seperatorHeight = styled.div`
	width: 1px;
	height: 70%;
	align-self: center;
	background: ${({ theme }) => theme.purple};
`;

export const Wallet_seperatorGeneric = styled.div`
	height: 2px;
	background: ${({ theme }) => theme.purple};
`;
