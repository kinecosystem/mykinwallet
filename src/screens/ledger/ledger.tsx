import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { CheckboxAlert, CheckboxContainer, LedgerStyle, LedgerHeader, PurpleTitle, ButtonContainer } from './style';
import { H3, Button } from 'common/selectors';
import DerivationPath from './DerivationPath';
import { CheckboxPremade as Checkbox } from 'src/components/antd/index';
import Modal from 'src/components/modals/terms/Terms';
import { navigate } from 'gatsby';

const IndexPage = props => {
	return (
		<Template step={1} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
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
		};
	};
	actions: {
		getPublicKey: Function;
		setTemplateErrors: Function;
		setDerivationPath: Function
	};
}

const Ledger: React.FunctionComponent<ILedger> = ({ store, actions }) => {
	const [checkbox, setCheckbox] = useState(false);
	const [hideCheckboxAlert, setHideCheckboxAlert] = useState(true);
	useEffect(() => {
		!store.blockchain.ledgerConnected && navigate('/');
	}, []);

	const handleSelect = value => {
		actions.getPublicKey(value);
		actions.setDerivationPath(value);
	};

	const handleCheckbox = ({ target }) => {
		setCheckbox(target.checked);
	};
	const handleButton = () => {
		if (checkbox && store.blockchain.publicKey) navigate('/transaction');
		if (!checkbox) setHideCheckboxAlert(false);
		if (!store.blockchain.publicKey) actions.setTemplateErrors(['choose derivation path']);
	};

	return (
		<LedgerStyle>
			<LedgerHeader>
				<H3>Network and address</H3>
			</LedgerHeader>
			<PurpleTitle>
				<span>Network:</span> Kin Public
			</PurpleTitle>
			<DerivationPath onChange={handleSelect} address={store.blockchain.publicKey} />
			<CheckboxContainer>
				<Checkbox onChange={handleCheckbox}>To access my wallet, I accept the</Checkbox>
				<Modal button={<i className="terms">terms.</i>} />
			</CheckboxContainer>
			<CheckboxAlert hide={hideCheckboxAlert}>Please accept terms</CheckboxAlert>
			<ButtonContainer>
				<Button onClick={handleButton}>Access my wallet</Button>
			</ButtonContainer>
		</LedgerStyle>
	);
};
export default IndexPage;
