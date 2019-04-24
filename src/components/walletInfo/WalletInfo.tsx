import React from 'react';
import { WalletInfoContainer, WalletInfoItem, Wallet_seperator, Wallet_seperatorHeight } from './style';

// example to call this 
{/* <WalletInfo 
    networkType='Public' 
    walletAddress="GBUZFMZXZ6S2Y6HP5IIMTCESJJYJW32GFPN7XAVMRNE2OYQTM3Y7XYXL" 
    balance={1500000000}
    /> */}

const IntlNumber = number => new Intl.NumberFormat('ja-JP').format(number);

const WalletInfo = props => {
	return (
		<WalletInfoContainer>
			<WalletInfoItem>
				<div className="WalletInfoItem__container">
					<span>Wallet Public address</span>
					<span className="wallet-address">{props.walletAddress}</span>
				</div>
			</WalletInfoItem>
			<Wallet_seperator />
			{/** this will appear on mobile and disappear on desktop*/}
			<div className="mobileOnly">
				<WalletInfoItem>
					<div className="WalletInfoItem__container">
						<span>Balance</span>
						<div>
							<span className="wallet-value">{IntlNumber(props.balance)}</span>
							KIN
						</div>
					</div>
				</WalletInfoItem>
				<Wallet_seperator />
				<WalletInfoItem>
					<div className="WalletInfoItem__container">
						<span>Network</span>
						<span className="wallet-address">{props.networkType}</span>
					</div>
				</WalletInfoItem>
			</div>
			{/** this will appear on desktop and disappear on mobile*/}
			<div className="desktopOnly">
				<WalletInfoItem>
					<div className="WalletInfoItem__container">
						<span>Balance</span>
						<div>
							<span className="wallet-value">{IntlNumber(props.balance)}</span>
							KIN
						</div>
					</div>
				</WalletInfoItem>
				<Wallet_seperatorHeight />
				<WalletInfoItem>
					<div className="WalletInfoItem__container">
						<span>Network</span>
						<span className="wallet-address">{props.networkType}</span>
					</div>
				</WalletInfoItem>
			</div>
		</WalletInfoContainer>
	);
};

export default WalletInfo;
