import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { H3, P, Button } from 'common/selectors';
import { ApprovePaymentStyled } from './style';
import { navigate } from 'gatsby';

const IndexPage = props => {
	return (
		<>
			<Template hide="terms" step={4} outOf={5} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
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
			transactionSubmitted: string;
			publicKey:string
		};
		transactionForm: object;
	};
	actions: {
		setSignTransaction: Function;
	};
}

const ApprovePayment: React.FunctionComponent<IApprovePayment> = ({ actions, store }) => {
	// state to prevent auto navigation on error at mounting
	const [initial, setInitial] = useState(true);
	const handleApprove = () => {
		const { derviationPath, unsignedTransaction, signedTransaction, publicKey } = store.blockchain;
		const { destinationAccount, kinAmount, memo } = store.transactionForm;
		actions.setSignTransaction({
			derviationPath,
			unsignedTransaction,
			signedTransaction,
			tx: {formData:[destinationAccount, kinAmount, memo], publicKey}
		});
		setInitial(false);
	};
	useEffect(() => {
		if (!store.blockchain.unsignedTransaction) navigate('/');
		if (store.errors.length && !initial) navigate('/review-payment');

		// if transaction was signed
		if (store.blockchain.transactionSubmitted) navigate('/transaction-approved');
	}, [store.blockchain.signedTransaction, store.errors, store.blockchain.transactionSubmitted]);

	return (
		<ApprovePaymentStyled>
			<H3>Approve Payment</H3>
			<P>Please verify the payment details on your Ledger device and approve the transaction.</P>

			<Button onClick={handleApprove}>Continue</Button>
		</ApprovePaymentStyled>
	);
};
export default IndexPage;
