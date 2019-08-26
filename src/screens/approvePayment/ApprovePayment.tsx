import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { H3, P, Button } from 'common/selectors';
import { ApprovePaymentStyled } from './style';
import { navigate, Link } from 'gatsby';
import { MessageTextContainer, GoBack } from '../reviewPayment/style';
import { MessageText } from 'src/components/messages/info';
import { createTransactionLedger } from '../../components/transactions_handlers/createTransaction';

const IndexPage = props => {
	const [isSignOut, setIsSignOut] = useState('signOut')
	const setHideSignOut = (value)=>{
		setIsSignOut(value)
	}
	return (
		<>
			<Template
				hide={isSignOut}
				step={4}
				outOf={5}
				title={{ main: 'My Kin Wallet', sub: ['Send your Kin coins to other wallets, exchanges or users.'], page: 'shared' }}
			>
				<ApprovePayment setHideSignOut={setHideSignOut} {...props} />
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
		resetTemplateErrors: Function;
	};
	setHideSignOut: Function
}

const ApprovePayment: React.FunctionComponent<IApprovePayment> = ({setHideSignOut, actions, store }) => {
	
	// state to prevent auto navigation on error at mounting
	const handleApprove = () => {
		createTransactionLedger(store, actions.setSignTransaction);
		actions.resetTemplateErrors()

	};
	useEffect(() => {
		if (!store.blockchain.unsignedTransaction) navigate('/');
		if(store.errors.length) setHideSignOut(null)
		else setHideSignOut("signOut")
		// if transaction was signed
		if (store.blockchain.transactionSubmitted) navigate('/transaction-approved');
	}, [store.blockchain.signedTransaction, store.errors, store.blockchain.transactionSubmitted]);
	useEffect(() => {
		// ask use to approve ledger transaction at page load
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
			{store.errors.length ? <Button onClick={handleApprove}>Try again</Button> : null}
		</ApprovePaymentStyled>
	);
};
export default IndexPage;

interface ItransactionForm {
	destinationAccount: string;
	kinAmount: Number;
	memo: string;
}
