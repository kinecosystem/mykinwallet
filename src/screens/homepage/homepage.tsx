import React, { ReactNode, FunctionComponent, useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { H3, H6 } from 'common/selectors';
import WalletPathItem from 'src/components/box/WalletPathItem';
import { ItemsContainer, HeaderContainer } from 'src/screens/homepage/style';
import WalletInfo from 'src/components/walletInfo/WalletInfo';
import { Location } from '@reach/router';
import ledger from 'src/images/ledger.svg';
import keypair from 'src/images/keypair.svg';

const IndexPage = props => {
	return (
		<>
			<Template github={true} step={1} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
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
	useEffect(() => {}, []);

	return (
		<div>
			{/** parse list of errors */}
			{/* {parseErrors(errors)} */}
			<HeaderContainer>
				<H3>Access my wallet</H3>
				<H6>Choose a method to access your account:</H6>
			</HeaderContainer>
			<ItemsContainer>
				<WalletPathItem actions={actions} store={store} img={ledger} name="Ledger" link="ledger" />
				<WalletPathItem actions={actions} store={store} alert img={keypair} name="Key pair wallet" link="key-access" />
			</ItemsContainer>
		</div>
	);
};
export default IndexPage;
