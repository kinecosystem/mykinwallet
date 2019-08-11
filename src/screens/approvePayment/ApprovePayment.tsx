import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { H3, P, Button } from 'common/selectors';
import { ApprovePaymentStyled } from './style';
import { navigate, Link } from 'gatsby';
import { MessageTextContainer, GoBack } from '../reviewPayment/style';
import { MessageText } from 'src/components/messages/info';
import { createTransactionLedger } from '../../components/transactions_handlers/createTransaction';

const IndexPage = props => {
	return (
		<>
			<Template hide="terms" step={4} outOf={5} title={{ main: 'My Kin Wallet', sub: ['Send Kin from your account'] }}>
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
			publicKey: string;
		};
		transactionForm: ItransactionForm;
	};
	actions: {
		setSignTransaction: Function;
		setLoader: Function;
	};
}

const ApprovePayment: React.FunctionComponent<IApprovePayment> = ({ actions, store }) => {
	// state to prevent auto navigation on error at mounting
	const [initial, setInitial] = useState(true);
	// const handleApprove = () => {
	// 	setInitial(false);
	// };
	useEffect(() => {
		if (!store.blockchain.unsignedTransaction) navigate('/');
		if (store.errors.length && !initial) navigate('/review-payment');

		// if transaction was signed
		if (store.blockchain.transactionSubmitted) navigate('/transaction-approved');
	}, [store.blockchain.signedTransaction, store.errors, store.blockchain.transactionSubmitted]);
	useEffect(() => {
		createTransactionLedger(store, actions.setSignTransaction);
	}, []);
	return (
		<ApprovePaymentStyled>
			<Link to="/transaction">
				<GoBack>{'<- Edit transaction details'}</GoBack>
			</Link>
			<H3>Verify payment on ledger</H3>
			<P>Please verify the payment details on your Ledger device and approve the transaction.</P>
			<MessageTextContainer visible={true}>
				<MessageText text="Once you send payment it is not possible to cancel the transaction." />
			</MessageTextContainer>
			{/* <Button onClick={handleApprove}>Continue</Button> */}
		</ApprovePaymentStyled>
	);
};
export default IndexPage;

interface ItransactionForm {
	destinationAccount: string;
	kinAmount: Number;
	memo: string;
}
