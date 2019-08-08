import React, { ReactNode, FunctionComponent, useEffect, useState, Fragment } from 'react';
import Template from 'src/components/pageTemplate/template';
import { H3, H6_lg } from 'common/selectors';
import WalletPathItem from 'src/components/walletPathItem/WalletPathItem';
import { ItemsContainer, HeaderContainer, DefaultError } from 'src/screens/homepage/style';
import ledger from 'src/images/ledger.svg';
import keypair from 'src/images/keypair.svg';
import { volcanoRed } from 'src/style/theme/generalVariables';
import text from './text.json';

import { T_14_16_lg } from '../../style/common/selectors';

const IndexPage = props => {
	return (
		<>
			<Template github={true} title={{ main: 'My Kin Wallet', sub: text.Text, page: 'homepage' }}>
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
			<T_14_16_lg color={volcanoRed} family="SailecBold">
				DON’T GET PHISHED!
			</T_14_16_lg>{' '}
			<br />
			<T_14_16_lg color={volcanoRed}>
				Make sure you have entered the correct MyKinWallet URL in full in the browser address line. Please bookmark (CTRL+D) for
				future use
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
