import React, { ReactNode, FunctionComponent, useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { H3, H6_lg } from 'common/selectors';
import WalletPathItem from 'src/components/walletPathItem/WalletPathItem';
import { ItemsContainer, HeaderContainer } from 'src/screens/homepage/style';
import ledger from 'src/images/ledger.svg';
import keypair from 'src/images/keypair.svg';

const IndexPage = props => {
	return (
		<>
			<Template github={true} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
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
	useEffect(() => {
		actions.resetAll();
	}, []);

	return (
		<div>
			<HeaderContainer>
				<H3>Access my wallet</H3>
				<H6_lg >Choose a method to access your account:</H6_lg>
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
