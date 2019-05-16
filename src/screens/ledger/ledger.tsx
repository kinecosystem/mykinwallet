import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { CheckboxAlert, CheckboxContainer, LedgerStyle, LedgerHeader, PurpleTitle, ButtonContainer } from './style';
import { H3, Button } from 'common/selectors';
import DerivationPath from './DerivationPath';
import { CheckboxPremade as Checkbox } from 'src/components/antd/index';
import { navigate, Link } from 'gatsby';

const IndexPage = props => {
	return (
		<Template step={2} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
			<Ledger {...props} />
		</Template>
	);
};

interface ILedger {
	store: {
		errors: string[];
		blockchain: {
			ledgerConnected: boolean;
			publicKey: string;
			derviationPath: string;
		};
	};
	actions: {
		getPublicKey: Function;
		setTemplateErrors: Function;
		setDerivationPath: Function;
		resetTemplateErrors: Function;
	};
}

const Ledger: React.FunctionComponent<ILedger> = ({ store, actions }) => {
	const [initial, setInitial] = useState(false);

	useEffect(() => {
		!store.blockchain.ledgerConnected && navigate('/');
	}, []);

	const handleSelect = value => {
		actions.resetTemplateErrors();
		actions.getPublicKey(value);
		actions.setDerivationPath(value);
	};

	const handleButton = () => {
		if (store.blockchain.publicKey && store.blockchain.derviationPath)
			navigate('/terms-and-conditions', { state: { lastPage: 'ledger' } });
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

//terms
/*
<CheckboxContainer>
<Checkbox onChange={handleCheckbox}>To access my wallet, I accept the</Checkbox>
<Link to="/terms-and-conditions" state={{ lastPage: 'ledger' }}>
	<span className="terms"> terms. </span>
</Link>
</CheckboxContainer>
<CheckboxAlert hide={hideCheckboxAlert}>Please accept terms</CheckboxAlert>
*/
