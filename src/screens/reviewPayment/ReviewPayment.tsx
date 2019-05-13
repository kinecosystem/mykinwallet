import React, { useEffect, useState, useRef } from 'react';
import Template from 'src/components/pageTemplate/template';
import { MessageText } from 'src/components/messages/info';
import { H3, P, Button } from 'common/selectors';
import { ReviewPaymentStyled, GoBack } from './style';
import PaymentInformation from 'src/components/paymentInformation/PaymentInformation';
import { Link, navigate } from 'gatsby';

const IntlNumber = number => new Intl.NumberFormat('ja-JP').format(number);

const IndexPage = props => {
	return (
		<>
			<Template hide="terms" step={5} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
				<ApprovePayment {...props} />
			</Template>
		</>
	);
};

interface IReviewPaymentStyled {
	store: {
		errors: string[];
		blockchain: {
			publicKey: string;
			account: object;
			derviationPath: string;
			unsignedTransaction: object;
			signedTransaction: object;
			isLedgerConnected: boolean;
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
	};
}

const ApprovePayment: React.FunctionComponent<IReviewPaymentStyled> = ({ store, actions }) => {
	const [goBack, setGoBack] = useState(true);
	const handleApprove = () => {
		setGoBack(false);
		const { derviationPath, unsignedTransaction } = store.blockchain;
		// ledger sign
		if (store.blockchain.ledgerConnected) actions.setSignTransaction([derviationPath, unsignedTransaction]);
		// keyPair sign
		else actions.setSignTransactionKeyPair([store.blockchain.secret, unsignedTransaction]);
	};
	useEffect(() => {
		if (store.blockchain.signedTransaction || !store.blockchain.unsignedTransaction) navigate('/transaction-approved');
	}, [store.blockchain.signedTransaction]);

	// const { balance } = store.blockchain.account.balances[0];
	// const { kinAmount } = store.transactionForm;
	return (
		<ReviewPaymentStyled>
			<Link to="/transaction">
				<GoBack>{'<- Edit transaction details'}</GoBack>
			</Link>
			<H3>Review Payment</H3>
			<P>Verify the payment details to continue</P>
			{store.transactionForm.kinAmount && store.blockchain.unsignedTransaction && (
				<PaymentInformation
					network={'public'}
					amount={store.transactionForm.kinAmount}
					publicAddress={store.transactionForm.destinationAccount}
					balance={IntlNumber(Number(store.blockchain.account.balances[0].balance) - Number(store.transactionForm.kinAmount))}
				/>
			)}
			<MessageText text="Once you send payment it is not possible to cancel the transaction." />
			<Button onClick={handleApprove}>Approve</Button>
		</ReviewPaymentStyled>
	);
};
export default IndexPage;
