import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { H3, P, Button } from 'common/selectors';
import { ApprovePaymentStyled } from './style';
import { navigate } from 'gatsby';

const IndexPage = props => {
	return (
		<>
			<Template hide="terms" step={4} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
				<ApprovePayment {...props} />
			</Template>
		</>
	);
};

interface IApprovePayment {
	store: {
		errors: string[];
		blockchain: {
			derviationPath: string;
			unsignedTransaction: string;
			signedTransaction: string;
		};
	};
	actions: {
		setSignTransaction: Function;
	};
}

const ApprovePayment: React.FunctionComponent<IApprovePayment> = ({ actions, store }) => {
	const handleApprove = () => {
		const { derviationPath, unsignedTransaction } = store.blockchain;
		actions.setSignTransaction([derviationPath, unsignedTransaction]);
	};
	useEffect(() => {
		if (store.blockchain.signedTransaction || !store.blockchain.unsignedTransaction) navigate('/transaction-approved');
	}, [store.blockchain.signedTransaction]);

	return (
		<ApprovePaymentStyled>
			<H3>Approve Payment</H3>
			<P>Please verify the payment details on your Ledger device and approve the transaction.</P>

			<Button onClick={handleApprove}>Continue</Button>
		</ApprovePaymentStyled>
	);
};
export default IndexPage;
