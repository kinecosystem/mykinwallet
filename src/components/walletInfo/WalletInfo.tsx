import React from 'react';
import { WalletInfoContainer, WalletInfoItem, Wallet_seperator, Wallet_seperatorHeight, Footer } from './style';
import handleCopy from '../../components/helpers/copy';
import { PublicKey } from '../../models/keys';
import { EXPLORER_URL_PARAMS } from '../../config';

interface IWalletInfo {
	walletAddress: string;
	tokenAccounts: object[];
	balances: object;
	ledgerConnected: boolean;
	derivationPath: any;
	environment: string;
	createTokenAccountFunc: () => {};
	fetchTokenAccountsFunc: () => {};
}
const IntlNumber = number => new Intl.NumberFormat('ja-JP').format(number);

const WalletInfo = (props: IWalletInfo) => {
	const pk = PublicKey.fromString(props.walletAddress);
	return (
		<WalletInfoContainer>
			<WalletInfoItem>
				<div className="WalletInfoItem__container">
					<span>Wallet Public Address</span>
					<span className="wallet-info"><b>Solana (Kin 4):</b></span>
					<span className="wallet-info">
						<a target="__blank" href={`https://explorer.solana.com/address/${pk.toBase58()+EXPLORER_URL_PARAMS}`}>
							{pk.toBase58()}
						</a>
					</span>
					<Footer>
						<p onClick={() => handleCopy(pk.toBase58())}>Copy address</p>
					</Footer>
					<span className="wallet-info"><b>Stellar (Kin 2/3):</b></span>
					<span className="wallet-info">{props.walletAddress}</span>
					<Footer>
						<p onClick={() => handleCopy(props.walletAddress)}>Copy address</p>
					</Footer>
				</div>
			</WalletInfoItem>
			<Wallet_seperator />
			<WalletInfoItem>
			<div className="WalletInfoItem__container">
			<span>Kin Token Accounts</span>
			<Footer>
			<p onClick={() => props.fetchTokenAccountsFunc()}>Refresh token accounts</p>
			</Footer>
			{props.tokenAccounts.length == 0 ? 
				<span className="wallet-info">{"No token accounts"}</span> : 
				props.tokenAccounts.map((tokenAccount, i) => (
					<div key={i}>
						<span className="wallet-info">
							<a target="__blank" href={`https://explorer.solana.com/address/${tokenAccount+EXPLORER_URL_PARAMS}`}>
								{tokenAccount}
							</a>
						</span>
					<div/>
					<span className="wallet-info">Balance: {props.balances[tokenAccount]} Kin</span>
					<Footer>
						<p onClick={() => handleCopy(tokenAccount)}>Copy token account address</p>
					</Footer>
					</div>
				))
			}
			</div>
			</WalletInfoItem>
			{props.tokenAccounts.length == 0 && <Wallet_seperator />}
			{props.tokenAccounts.length == 0 && 
			<WalletInfoItem>
			<Footer>
				<p onClick={() => props.createTokenAccountFunc()}>Create token account</p>
			</Footer>
			<div><i><b>Please Note: </b><br/>
				- If you are using a ledger device, action will be required on your device.<br/>
				- <a target="__blank" href={'https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment'}>Single commitment</a> is 
				used for this create account transaction, so you may need to refresh your token accounts to see the new account.<br/></i></div>
			</WalletInfoItem>}
			<Wallet_seperator />
			<WalletInfoItem>
				<div className="WalletInfoItem__container">
					<span>Environment</span>
					<span className="wallet-info">{props.environment}</span>
				</div>
			</WalletInfoItem>
		</WalletInfoContainer>
	);
};

export default WalletInfo;
