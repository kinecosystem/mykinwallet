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
	const { balance } = store.blockchain.account.balances[0];
	const { kinAmount } = store.transactionForm;
	return (
		<ApprovedPaymentStyled>
			<H3>Transaction approved</H3>
			<P>Here are the details of your payment:</P>
			{store.transactionForm.kinAmount && store.blockchain.unsignedTransaction && (
				<PaymentInformation
					ledger={store.blockchain.unsignedTransaction.sequence}
					amount={store.transactionForm.kinAmount}
					transaction={'02972d0124ea91a8949ac476862b8b23ea63160a86c35f133a021ce91d2b5cfe'}
					time={'123'}
					balance={IntlNumber(Number(balance) - Number(kinAmount))}
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
