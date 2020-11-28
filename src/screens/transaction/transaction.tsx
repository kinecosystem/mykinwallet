import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import Template from 'src/components/pageTemplate/template';
import { TransactionContent, GrayedArea, TransactionStyled, HeaderContainer } from './style';
import { H3, Button } from 'common/selectors';
import formInput from 'src/components/formInput/formInput';
import { authFormTheme } from 'style/theme/generalVariables';
import * as Styled from './style';
import WalletInfo from 'src/components/walletInfo/WalletInfo';
import RecentBlockhash from 'src/components/recentBlockhash/RecentBlockhash';
import validate from './validation';
import { navigate, Link } from 'gatsby';
import inputFields from './inputFields.tsx';
import { PublicKey } from '../../models/keys';

interface IFormData {
	destinationAccount?: string;
	kinAmount?: string;
	memo?: string;
}

const Index: React.FunctionComponent<InjectedFormProps<IFormData>> = props => {
	const stepByPath = () => (props.isLedgerConnected ? 3 : 2);
	const outOfByPath = () => (props.isLedgerConnected ? 5 : 4);
	return (
		<Template
			hide="terms"
			step={2}
			outOf={outOfByPath()}
			title={{ main: 'MyKinWallet', sub: ['Send your Kin coins to other wallets, exchanges or users.'], page: 'shared' }}
		>
			<Transaction {...props} />
		</Template>
	);
};

const Transaction: React.FunctionComponent<ITransaction> = ({
	actions,
	store,
	handleSubmit,
	validate,
	initialValues,
	location
}) => {
	const [initial, setInitial] = useState(true);
	const fee = 0.001;
	// TODO: move to localization

	const onSubmit = formValues => {
		let { balance } = store.blockchain.account.balances[0];
		balance = Number(balance);
		const amountPlusFee = Number(formValues.kinAmount) + fee;
		validate(formValues, balance);
		if (balance < amountPlusFee) return actions.setTemplateErrors(['Insufficient funds for the requested transfer']);
		const { destinationAccount, kinAmount, memo } = formValues;
		const account = store.blockchain.publicKey;
		// from: account  to: Destination account   amount:Kin Amount   memo:memo
		actions.getUnsignedTransaction([account, destinationAccount, kinAmount, memo || '']);
		actions.setTransactionDataInput({ destinationAccount, kinAmount, memo });
		setInitial(false);
	};
	useEffect(() => {
		// if publicKey couldnt be retrived
		if (!store.blockchain.publicKey) {
			navigate('/');
			return;
		}
		if (store.solana.tokenAccounts.length == 0) {
			actions.resolveTokenAccounts(PublicKey.fromString(store.blockchain.publicKey).toBase58())
		}

		// TODO: don't need to prefetch this
		if (!store.solana.recentBlockhash) {
			actions.getRecentBlockhash();
		}

		// if unsigned transaction have been made & its not on page mount
		if (store.blockchain.unsignedTransaction && !initial) navigate('/review-payment');
		if (initial) actions.resetTransactions();
	}, [store.blockchain.account, store.blockchain.unsignedTransaction, store.blockchain.publicKey]);
	useEffect(() => {
		actions.resetTemplateErrors();
	}, []);
	const formFields = inputFields.map(item => <Field key={item.name} {...item} component={formInput} {...authFormTheme} />);
	return (
		<TransactionStyled>
			<TransactionContent>
				{/** TODO: visible if !blockhash and !account */}
				<GrayedArea visible={false} className="grayedArea" />
				<HeaderContainer>
					<H3>MyKinWallet</H3>
				</HeaderContainer>
				{/** TODO: remove this */}
				{store.solana.recentBlockhash && (
					<RecentBlockhash
						recentBlockhash={store.solana.recentBlockhash} />
				)}
				{store.blockchain.publicKey && (
					<WalletInfo
						networkType="Public"
						walletAddress={store.blockchain.publicKey}
						tokenAccounts={store.solana.tokenAccounts}
						ledgerConnected={store.blockchain.ledgerConnected}
						derivationPath={store.blockchain.derviationPath}
					/>
				)}

				<Styled.formContainer>
					<H3>Send Kin</H3>
					<Styled.form initialValues={initialValues} onSubmit={handleSubmit(onSubmit)}>
						{formFields}
						{/** TODO: visible if blockhash + account present */}
						<Styled.ButtonContainer visible={true}>
							<Button type="submit">Send Payment</Button>
						</Styled.ButtonContainer>
					</Styled.form>
				</Styled.formContainer>
			</TransactionContent>
			{/** if No account detailes present a back button */}
			{/** TODO: visible if !blockhash and !account */}
			<Styled.ButtonContainer visible={false}>
				<Link to={store.blockchain.ledgerConnected ? '/ledger' : '/key-access'}>
					<Button>Back</Button>
				</Link>
			</Styled.ButtonContainer>
		</TransactionStyled>
	);
};
const mapStateToProps = state => ({
	initialValues: state.blockchain.transactionForm, // retrieve name from redux store
	isLedgerConnected: state.blockchain.blockchain.ledgerConnected
});

export default connect(mapStateToProps)(
	reduxForm({
		form: 'transactionForm',
		validate
	})(Index)
);

interface ITransaction {
	store: {
		errors: string[];
		blockchain: {
			publicKey: string;
			account: object;
			derviationPath: string;
			unsignedTransaction: object;
			ledgerConnected: boolean;
		},
		solana: {
			tokenAccounts: object[];
			balances: object;
			recentBlockhash: Uint8Array;
		};
	};
	actions: {
		getAccount: Function;
		getUnsignedTransaction: Function;
		resetTransactions: Function;
		setTransactionDataInput: Function;
		resetTemplateErrors: Function;
		resolveTokenAccounts: Function;
		getAccountInfo: Function;
		getRecentBlockhash: Function;
	};
	handleSubmit: Function;
	validate: Function;
	initialValues: Object;
	location: object;
}
