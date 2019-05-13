import React, { useEffect } from 'react';
import Template from 'src/components/pageTemplate/template';
import PaymentInformation from 'src/components/paymentInformation/PaymentInformation';
import { H3, P } from 'common/selectors';
import { ApprovedPaymentStyled } from './style';
import { navigate } from 'gatsby';

const IntlNumber = number => new Intl.NumberFormat('ja-JP').format(number);

const IndexPage = props => {
	return (
		<>
			<Template hide="terms" step={6} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
				<TransactionApproved {...props} />
			</Template>
		</>
	);
};

interface ITransactionApproved {
	props: {
		store: {
			errors: string[];
		};
		actions: object[];
	};
}

const TransactionApproved: React.FunctionComponent<ITransactionApproved> = ({ store, actions }) => {
	useEffect(() => {
		!store.blockchain.unsignedTransaction && navigate('/');
		return () => actions.resetAll();
	}, [store.blockchain.signedTransaction]);
	// const { balance } = store.blockchain.account.balances[0];
	// const { kinAmount } = store.transactionForm;
	return (
		<ApprovedPaymentStyled>
			<H3>Transaction approved</H3>
			<P>Here are the details of your payment:</P>
			{store.transactionForm.kinAmount && store.blockchain.signedTransaction && (
				<PaymentInformation
					ledger={store.blockchain.signedTransaction.ledger}
					amount={store.transactionForm.kinAmount}
					transaction={store.blockchain.signedTransaction.hash}
					time={'123'}
					balance={IntlNumber(Number(store.blockchain.account.balances[0].balance) - Number(store.transactionForm.kinAmount))}
					purple="purple"
				/>
			)}
			<section>
				<P>Go to Kin Block Explorer to see your transaction: </P>
				<P className="bold">www.kin.org/blockchainExplorer</P>
			</section>
		</ApprovedPaymentStyled>
	);
};
export default IndexPage;
