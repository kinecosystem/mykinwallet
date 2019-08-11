import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { LedgerStyle, LedgerHeader, PurpleTitle, ButtonContainer } from './style';
import { H3, Button } from 'common/selectors';
import DerivationPath from './DerivationPath';
import { navigate } from 'gatsby';

const IndexPage = props => {
	return (
		<Template
			step={1}
			outOf={5}
			title={{ main: 'My Kin Wallet', sub: ['Send your Kin coins to other wallets, exchanges or users.'], page: 'shared' }}
		>
			<Ledger {...props} />
		</Template>
	);
};

interface ILedger {
	store: {
		errors: string[];
		blockchain: {
			ledgerConnected: boolean;
			terms: boolean;
			publicKey: string;
			derviationPath: string;
		};
	};
	actions: {
		getPublicKey: Function;
		setTemplateErrors: Function;
		setDerivationPath: Function;
		resetTemplateErrors: Function;
		setAccount: Function;
	};
}

const Ledger: React.FunctionComponent<ILedger> = ({ store, actions }) => {
	const [initial, setInitial] = useState(false);

	useEffect(() => {
		!store.blockchain.ledgerConnected && navigate('/');
	}, []);

	const handleSelect = value => {
		actions.setAccount({ account: false });
		actions.resetTemplateErrors();
		actions.getPublicKey(value);
		actions.setDerivationPath(value);
	};

	const handleButton = () => {
		if (store.blockchain.publicKey && store.blockchain.derviationPath)
			if (!store.blockchain.terms) {
				navigate('/terms-and-conditions', { state: { lastPage: 'ledger' } });
			} else {
				navigate('/transaction', { state: { type: 'ledger' } });
			}
		if (!store.blockchain.publicKey) actions.setTemplateErrors(['Choose derivation path']);
	};

	return (
		<LedgerStyle>
			<LedgerHeader>
				<H3>Network and address</H3>
			</LedgerHeader>
			<PurpleTitle>
				<span>Network:</span> Kin Public
			</PurpleTitle>
			<DerivationPath initial={store.blockchain.derviationPath} onChange={handleSelect} address={store.blockchain.publicKey} />

			<ButtonContainer>
				<Button onClick={handleButton}>Access my wallet</Button>
			</ButtonContainer>
		</LedgerStyle>
	);
};
export default IndexPage;
