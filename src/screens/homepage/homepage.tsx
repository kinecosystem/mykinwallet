import React, { ReactNode, FunctionComponent, useEffect, useState, Fragment } from 'react';
import Template from 'src/components/pageTemplate/template';
import { H3, H6_lg } from 'common/selectors';
import WalletPathItem from 'src/components/walletPathItem/WalletPathItem';
import { ItemsContainer, HeaderContainer, DefaultError } from 'src/screens/homepage/style';
import ledger from 'src/images/ledger.svg';
import keypair from 'src/images/keypair.svg';
import { volcanoRed } from 'src/style/theme/generalVariables';
import text from './text.jsx';

import { T_14_16_lg } from '../../style/common/selectors';

const IndexPage = props => {
	return (
		<>
			<Template github={true} title={{ main: 'MyKinWallet', sub: text.Text, page: 'homepage' }}>
				<Homepage {...props} />
			</Template>
		</>
	);
};

interface IHompage {
	store: {
		errors: string[];
	};
	actions: object[];
	children: ReactNode;
}

const Homepage: FunctionComponent<IHompage> = ({ actions, store }) => {
	const [errors] = useState([
		<Fragment>
			<T_14_16_lg color={volcanoRed} family="Verdana">
				DEPRECATION NOTICE
			</T_14_16_lg>{' '}
			<br />
			<T_14_16_lg color={volcanoRed}>
				MyKinWallet uses a custom derivation path introduced to enable Solana migration from Stellar. <br />
				With migration completed, we will deprecate this path, ending support on December 31st 2022. Using Solana's standardized
				path has &nbsp;
				<a target="_blank" href="https://twitter.com/DanPaul000/status/1380933553530183681">
					several advantages
				</a>
				&nbsp; including:
				<ul>
					<li>Wallet choice</li>
					<li>Ease of use</li>
					<li>Keeping with Solana's latest standards</li>
				</ul>
				<br />
				Please follow{' '}
				<a target="_blank" href="https://kin.org/mykinwallet-deprecation/">
					{' '}
					these instructions
				</a>{' '}
				to switch derviation paths as soon as possible.
			</T_14_16_lg>
		</Fragment>,
		<Fragment>
			<T_14_16_lg color={volcanoRed}>
				IMPORTANT!
			</T_14_16_lg>{' '}
			<T_14_16_lg color={volcanoRed}>
				1. Bookmark MyKinWallet (CTRL+D) for future use and avoid phishing.<br/>
				2. This wallet is only designed to transact with KIN. Do not send SOL.
			</T_14_16_lg>
		</Fragment>
	]);
	const [initial, setInitial] = useState(false);

	useEffect(() => {
		actions.setTemplateErrors([...errors]);
		if (!initial) {
			actions.resetAll();
			setInitial(true);
		}
	}, [initial]);

	return (
		<div>
			<HeaderContainer>
				<H3>Access my wallet</H3>
				<H6_lg>Choose a method to access your account:</H6_lg>
			</HeaderContainer>
			<ItemsContainer>
				<WalletPathItem
					actions={actions}
					store={store}
					img={ledger}
					type="ledger"
					link="ledger"
					title={
						<div>
							Ledger <br /> device
						</div>
					}
				/>
				<WalletPathItem
					actions={actions}
					store={store}
					alert
					img={keypair}
					type="key pair"
					title={
						<div>
							Key pair / <br /> paper wallet{' '}
						</div>
					}
					link="key-access"
				/>
			</ItemsContainer>
		</div>
	);
};
export default IndexPage;
