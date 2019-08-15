import React from 'react';
import { WalletInfoContainer, WalletInfoItem, Wallet_seperator, Wallet_seperatorHeight, Footer } from './style';
import handleCopy from '../../components/helpers/copy';
import showAddress from '../helpers/showAddressOnLedger';

interface IwalletInfo {
	walletAddress: string;
	ledgerConnected: boolean;
	derivationPath: any;
	balance: number;
	networkType: string;
}
const IntlNumber = number => new Intl.NumberFormat('ja-JP').format(number);

const WalletInfo = (props: IwalletInfo) => {
	return (
		<WalletInfoContainer>
			<WalletInfoItem>
				<div className="WalletInfoItem__container">
					<span>Wallet Public address</span>
					<span className="wallet-address">{props.walletAddress}</span>
					<Footer>
						<p onClick={() => handleCopy(props.walletAddress)}>Copy address</p>
						{props.ledgerConnected && <p onClick={() => showAddress(props.derivationPath)}>Display address on your device</p>}
					</Footer>
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
