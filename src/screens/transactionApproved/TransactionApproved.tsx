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
					ledger={<Ledger ledger={store.blockchain.signedTransaction.ledger} />}
					amount={store.transactionForm.kinAmount}
					transaction={<Transaction transaction={store.blockchain.signedTransaction.hash} />}
					balance={IntlNumber(Number(store.blockchain.account.balances[0].balance) - Number(store.transactionForm.kinAmount))}
					purple="purple"
				/>
			)}
			<section>
				<P>Go to Kin Block Explorer to see your account: </P>
				<P className="bold">
					<Account account={store.blockchain.publicKey} />
				</P>
			</section>
		</ApprovedPaymentStyled>
	);
};
export default IndexPage;

const Transaction = ({ transaction }) => (
	<a href={`https://www.kin.org/blockchainInfoPage/?&dataType=test&header=Transaction&id=${transaction}`}>{transaction}</a>
);
const Ledger = ({ ledger }) => (
	<a href={`https://www.kin.org/blockchainInfoPage/?&dataType=test&header=Ledgers&id=${ledger}`}>{ledger}</a>
);
const Account = ({ account }) => (
	<a href={`https://www.kin.org/blockchainAccount/?&dataType=public&header=accountID&id=${account}`}>Your account</a>
);
