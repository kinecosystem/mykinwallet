import React, { useEffect } from 'react';
import Template from 'src/components/pageTemplate/template';
import { CheckboxContainer, LedgerStyle, LedgerHeader, PurpleTitle, ButtonContainer } from './style';
import { H3, Button } from 'common/selectors';
import DerivationPath from './DerivationPath';
import { CheckboxPremade as Checkbox } from 'src/components/antd/index';
import { Link } from 'gatsby';
import Modal from 'src/components/modals/terms/Terms';

const IndexPage = () => {
	return (
		<Template step={1} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
			<Ledger />
		</Template>
	);
};

interface ILedger {
	props: {
		store: {
			errors: string[];
		};
		actions: object[];
	};
}

const Ledger: React.FunctionComponent<ILedger> = () => {
	const handleSelect = value => {
		console.log(value);
	};
	const handleCheckbox = ({ target }) => {
		console.log(target.checked);
	};
	useEffect(() => {});
	return (
		<LedgerStyle>
			<LedgerHeader>
				<H3>Network and address</H3>
			</LedgerHeader>
			<PurpleTitle>
				<span>Network</span> Kin Public
			</PurpleTitle>
			<DerivationPath onChange={handleSelect} address="a5vvoj9ijom98hnihuiuhiuhitdre45k7hehgg….6bn" />
			<CheckboxContainer>
				<Checkbox onChange={handleCheckbox}>
					To access my wallet, I accept the <Modal button={ <span>terms.</span>}/>
				</Checkbox>
			</CheckboxContainer>
			<ButtonContainer>
				<Button>Access my wallet</Button>
			</ButtonContainer>
		</LedgerStyle>
	);
};
export default IndexPage;
