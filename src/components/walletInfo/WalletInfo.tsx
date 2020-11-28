import React from 'react';
import { WalletInfoContainer, WalletInfoItem, Wallet_seperator, Wallet_seperatorHeight, Footer } from './style';
import handleCopy from '../../components/helpers/copy';
import showAddress from '../helpers/showAddressOnLedger';
import { PublicKey } from '../../models/keys';

interface IWalletInfo {
	walletAddress: string;
	tokenAccounts: object[];
	ledgerConnected: boolean;
	derivationPath: any;
	networkType: string;
}
const IntlNumber = number => new Intl.NumberFormat('ja-JP').format(number);

const WalletInfo = (props: IWalletInfo) => {
	const pk = PublicKey.fromString(props.walletAddress);
	return (
		<WalletInfoContainer>
			<WalletInfoItem>
				<div className="WalletInfoItem__container">
					<span>Wallet Public Address</span>
					<span className="wallet-info"><b>Stellar (Kin 2/3):</b></span>
					<span className="wallet-info">{props.walletAddress}</span>
					<Footer>
						<p onClick={() => handleCopy(props.walletAddress)}>Copy address</p>
						{props.ledgerConnected && <p onClick={() => showAddress(props.derivationPath)}>Display address on your device</p>}
					</Footer>
					<span className="wallet-info"><b>Solana (Kin 4):</b></span>
					<span className="wallet-info">{pk.toBase58()}</span>
					<Footer>
						<p onClick={() => handleCopy(pk.toBase58())}>Copy address</p>
						{props.ledgerConnected && <p onClick={() => showAddress(props.derivationPath)}>Display address on your device</p>}
					</Footer>
				</div>
			</WalletInfoItem>
			<Wallet_seperator />
			<WalletInfoItem>
			<div className="WalletInfoItem__container">
			<span>Token Accounts</span>
			{props.tokenAccounts.length == 0 ? 
				<span className="wallet-info">{"No token accounts"}</span> : 
				props.tokenAccounts.map(tokenAccount => (
					<div>
					<span className="wallet-info">{tokenAccount.accountID}</span><div/>
					<span className="wallet-info">Balance: {tokenAccount.kinBalance} Kin</span>
					<Footer>
						<p onClick={() => handleCopy(tokenAccount)}>Copy token account address</p>
					</Footer>
					</div>
				))
			}
			</div>
			</WalletInfoItem>
			<Wallet_seperator />
			<WalletInfoItem>
				<div className="WalletInfoItem__container">
					<span>Network</span>
					<span className="wallet-info">{props.networkType}</span>
				</div>
			</WalletInfoItem>
		</WalletInfoContainer>
	);
};

export default WalletInfo;
