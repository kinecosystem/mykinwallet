import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { MessageText } from 'src/components/messages/info';
import { H3, P, Button } from 'common/selectors';
import { ReviewPaymentStyled, GoBack, ButtonContainer, MessageTextContainer } from './style';
import PaymentInformation from 'src/components/paymentInformation/PaymentInformation';
import { Link, navigate } from 'gatsby';
import { connect } from 'react-redux';
import balanceCalculator from 'src/components/helpers/balanceCalculator';
import { createTransactionKeyPair, createTransactionLedger } from '../../components/transactions_handlers/createTransaction';

const IndexPage = props => {
	const outOfByPath = () => (props.isLedgerConnected ? 5 : 4);
	return (
		<>
			<Template
				hide="terms"
				step={3}
				outOf={outOfByPath()}
				title={{ main: 'MyKinWallet', sub: ['Send your Kin coins to other wallets, exchanges or users.'] ,page:'shared'}}
			>
				<ApprovePayment {...props} />
			</Template>
		</>
	);
};



const ApprovePayment: React.FunctionComponent<IReviewPaymentStyled> = ({ store, actions }) => {
	// hide the button if error disable progress
	const [transactionValid, setTransactionValid] = useState(true);
	const [balanceAfterTransaction, setBalanceAfterTransaction] = useState(0);

	const handleApprove = () => {
		setTransactionValid(true);

		// ledger step
		if (store.blockchain.ledgerConnected) navigate('/approve-payment');
		// keyPair step
		// create keyPair transaction
		else createTransactionKeyPair(store, actions.setSignTransactionKeyPair);
	};
	useEffect(() => {
		if (store.blockchain.transactionSubmitted) navigate('/transaction-approved');
		if (
			store.errors[0] === 'Error: Request failed with status code 404' ||
			store.errors[0] === 'Error: Request failed with status code 400'
		) {
			// hide the approve button if false (transaction not valid)
			setTransactionValid(false);
		}
	}, [store.blockchain.transactionSubmitted, store.errors]);

	useEffect(() => {
		if (store.blockchain.account) {
			if (store.blockchain.account.balances) {
				const balance = Number(store.blockchain.account.balances[0].balance);
				const amount = Number(store.transactionForm.kinAmount);
				const sum = balanceCalculator(balance, amount);
				setBalanceAfterTransaction(sum);
			}
		}
	}, [store.blockchain.account]);

	return (
		<ReviewPaymentStyled>
			<Link to="/transaction">
				<GoBack>{'<- Edit transaction details'}</GoBack>
			</Link>
			<H3>Review Payment</H3>
			<P>Verify the payment details to continue</P>
			{store.transactionForm.kinAmount && store.blockchain.unsignedTransaction && (
				<PaymentInformation
					network={'Public'}
					amount={store.transactionForm.kinAmount}
					publicAddress={store.transactionForm.destinationAccount}
					memo={store.transactionForm.memo}
					balance={transactionValid && balanceAfterTransaction}
				/>
			)}
			<MessageTextContainer visible={transactionValid}>
				<MessageText text="Once you send payment it is not possible to cancel the transaction." />
			</MessageTextContainer>
			<ButtonContainer visible={transactionValid}>
				<Button onClick={handleApprove}>Approve</Button>
			</ButtonContainer>
		</ReviewPaymentStyled>
	);
};

const mapStateToProps = (state, props) => ({
	isLedgerConnected: state.blockchain.blockchain.ledgerConnected
});

export default connect(mapStateToProps)(IndexPage);


interface IReviewPaymentStyled {
	store: {
		errors: string[];
		blockchain: {
			publicKey: string;
			account: object;
			derviationPath: string;
			unsignedTransaction: object;
			transactionSubmitted: object;
			signedTransaction: object;
			ledgerConnected: boolean;
			secret: string;
		};
		transactionForm: {
			destinationAccount: string;
			kinAmount: string;
			memo: string;
		};
	};
	actions: {
		resetAll: Function;
		setSignTransaction: Function;
		getUnsignedTransaction: Function;
		setSignTransactionKeyPair: Function;
		setLoader: Function;
	};
}
