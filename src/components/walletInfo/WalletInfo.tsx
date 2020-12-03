import React from 'react';
import { WalletInfoContainer, WalletInfoItem, Wallet_seperator, Wallet_seperatorHeight, Footer } from './style';
import handleCopy from '../../components/helpers/copy';
import showAddress from '../helpers/showAddressOnLedger';
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
					</Footer>
					<span className="wallet-info"><b>Solana (Kin 4):</b></span>
					<span className="wallet-info">
                        <a target="__blank" href={`https://explorer.solana.com/address/${pk.toBase58()+EXPLORER_URL_PARAMS}`}>
                            {pk.toBase58()}
                        </a>
                    </span>
					<Footer>
						<p onClick={() => handleCopy(pk.toBase58())}>Copy address</p>
					</Footer>
				</div>
			</WalletInfoItem>
			<Wallet_seperator />
			<WalletInfoItem>
			<div className="WalletInfoItem__container">
			<span>Kin Token Accounts</span>
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
            <Wallet_seperator />
            <WalletInfoItem>
			<Footer>
				<p onClick={() => props.createTokenAccountFunc()}>Create new token account (random address)</p>
			</Footer>
            <div><i><b>Please Note</b>: If you are using a ledger device, action may be required on your device.</i></div>
            </WalletInfoItem>
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
