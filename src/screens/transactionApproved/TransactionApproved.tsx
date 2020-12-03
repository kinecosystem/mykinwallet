import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import PaymentInformation from 'src/components/paymentInformation/PaymentInformation';
import { H3, P } from 'common/selectors';
import { ApprovedPaymentStyled, StartOver } from './style';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import balanceCalculator from 'src/components/helpers/balanceCalculator';
import bs58 from 'bs58';
import transactionpb from '@kinecosystem/agora-api/node/transaction/v4/transaction_service_pb';
import { EXPLORER_URL_PARAMS } from '../../config';

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
		solana: {
			balances: object;
			signature: Uint8Array;
			submitResponse: transactionpb.SubmitTransactionResponse;
		}
		transactionForm: {
			kinAmount: number;
			tokenAccount: string;
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
		!store.solana.signature && navigate('/');
		return () => actions.resetAll();
	}, [store.solana.signature]);

	useEffect(() => {
		const tokenAccount = store.transactionForm.tokenAccount;
		if (store.solana.balances[tokenAccount]) {
			const balance = Number(store.solana.balances[tokenAccount]);
			const amount = Number(store.transactionForm.kinAmount);
			const result = balanceCalculator(balance, amount);
			setBalanceAfterTransaction(result);
		}
	}, [store.solana.balances]);
	useEffect(() => {
		actions.setLoader(false);
	}, []);
	return (
		<ApprovedPaymentStyled>
			<H3>Transaction submitted</H3>
			<P>Here are the details of your payment:</P>
			{store.transactionForm.kinAmount && store.solana.signature && (
				<PaymentInformation
					amount={store.transactionForm.kinAmount}
					transaction={<Transaction signature={bs58.encode(store.solana.signature)} />}
					balance={balanceAfterTransaction}
					purple="purple"
				/>
			)}
			<section>
				<P>
					Go to Solana Explorer to see your <Account account={store.transactionForm.tokenAccount} />{' '}
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

const Transaction = ({ signature }) => (
	<a target="__blank" href={`https://explorer.solana.com/tx/${signature+EXPLORER_URL_PARAMS}`}>
		{signature}
	</a>
);
const Account = ({ account }) => (
	<a target="__blank" href={`https://explorer.solana.com/address/${account+EXPLORER_URL_PARAMS}`}>
		account
	</a>
);
