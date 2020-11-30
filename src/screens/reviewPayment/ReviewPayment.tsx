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
import transactionpb from '@kinecosystem/agora-api/node/transaction/v4/transaction_service_pb';
import { Transaction as SolanaTransaction } from '@solana/web3.js';

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
		if (store.blockchain.ledgerConnected) {
			navigate('/approve-payment');
		} else {
			const tx = store.solana.transaction;
			const secret = store.blockchain.secret;
			actions.signAndSubmitTransaction([tx, secret]);
		}
	};
	useEffect(() => {
		console.log(store.solana)
		if (store.solana.signature && store.solana.submitResponse) navigate('/transaction-approved');
		if (
			store.errors[0] && (store.errors[0].includes('balance') || store.errors[0].includes('account'))
		) {
			// hide the approve button if false (transaction not valid)
			setTransactionValid(false);
		}
	}, [store.solana.signature, store.solana.submitResponse, store.errors]);

	useEffect(() => {
		const tokenAccount = store.transactionForm.tokenAccount;
		if (store.solana.balances[tokenAccount]) {
			const balance = Number(store.solana.balances[tokenAccount]);
			const amount = Number(store.transactionForm.kinAmount);
			const result = balanceCalculator(balance, amount);
			setBalanceAfterTransaction(result);
		}
	}, [store.solana.balances])

	return (
		<ReviewPaymentStyled>
			<Link to="/transaction">
				<GoBack>{'<- Edit transaction details'}</GoBack>
			</Link>
			<H3>Review Payment</H3>
			<P>Verify the payment details to continue</P>
			{store.transactionForm.kinAmount && store.solana.transaction && (
				<PaymentInformation
					network={'Public'}
					amount={store.transactionForm.kinAmount}
					tokenAccount={store.transactionForm.tokenAccount}
					destinationAccount={store.transactionForm.destinationAccount}
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
		solana: {
			tokenAccounts: object[];
			balances: object;
			recentBlockhash: Uint8Array;
			transaction: SolanaTransaction;
			signature: Uint8Array;
			submitResponse: transactionpb.SubmitTransactionResponse;
		};
		transactionForm: {
			tokenAccount: string;
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
		signAndSubmitTransaction: Function;
	};
}
