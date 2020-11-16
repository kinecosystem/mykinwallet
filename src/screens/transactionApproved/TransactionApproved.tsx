import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import PaymentInformation from 'src/components/paymentInformation/PaymentInformation';
import { H3, P } from 'common/selectors';
import { ApprovedPaymentStyled, StartOver } from './style';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import balanceCalculator from 'src/components/helpers/balanceCalculator';

const IndexPage = props => {
	const stepByPath = () => (props.isLedgerConnected ? 5 : 4);
	const outOfByPath = () => (props.isLedgerConnected ? 5 : 4);
	return (
		<>
			<Template
				hide="terms"
				step={stepByPath()}
				outOf={outOfByPath()}
				title={{ main: 'MyKinWallet', sub: ['Send your Kin coins to other wallets, exchanges or users.'], page:'shared'}}
			>
				<TransactionApproved {...props} />
			</Template>
		</>
	);
};

interface ITransactionApproved {
	store: {
		blockchain: {
			transactionSubmitted: object;
			transactionForm: object;
			account: object;
			signedTransaction: object;
			publicKey: string;
		};
		transactionForm: {
			kinAmount: number;
		};

		errors: string[];
	};
	actions: {
		setLoader: Function;
		resetAll: Function;
	};
}

const TransactionApproved: React.FunctionComponent<ITransactionApproved> = ({ store, actions }) => {
	const [balanceAfterTransaction, setBalanceAfterTransaction] = useState(0);

	useEffect(() => {
		!store.blockchain.signedTransaction && navigate('/');
		return () => actions.resetAll();
	}, [store.blockchain.transactionSubmitted]);

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
	useEffect(() => {
		actions.setLoader(false);
	}, []);
	return (
		<ApprovedPaymentStyled>
			<H3>Transaction approved</H3>
			<P>Here are the details of your payment:</P>
			{store.transactionForm.kinAmount && store.blockchain.transactionSubmitted && (
				<PaymentInformation
					ledger={<Ledger ledger={store.blockchain.transactionSubmitted.ledger} />}
					amount={store.transactionForm.kinAmount}
					transaction={<Transaction transaction={store.blockchain.transactionSubmitted.hash} />}
					balance={balanceAfterTransaction}
					purple="purple"
				/>
			)}
			<section>
				<P>
					Go to Kin Block Explorer to see your <Account account={store.blockchain.publicKey} />{' '}
				</P>
			</section>
			<StartOver onClick={() => actions.resetAll()}> {'<-'} Create another transaction</StartOver>
		</ApprovedPaymentStyled>
	);
};
const mapStateToProps = state => ({
	isLedgerConnected: state.blockchain.blockchain.ledgerConnected
});

export default connect(mapStateToProps)(IndexPage);

const Transaction = ({ transaction }) => (
	<a target="__blank" href={`https://www.kin.org/blockchainInfoPage/?&dataType=public&header=Transaction&id=${transaction}`}>
		{transaction}
	</a>
);
const Ledger = ({ ledger }) => (
	<a target="__blank" href={`https://www.kin.org/blockchainInfoPage/?&dataType=public&header=Ledgers&id=${ledger}`}>
		{ledger}
	</a>
);
const Account = ({ account }) => (
	<a target="__blank" href={`https://www.kin.org/blockchainAccount/?&dataType=public&header=accountID&id=${account}`}>
		account
	</a>
);
