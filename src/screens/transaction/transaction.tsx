import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import Template from 'src/components/pageTemplate/template';
import { TransactionContent, GrayedArea, TransactionStyled, HeaderContainer } from './style';
import { H3, Button } from 'common/selectors';
import { SelectPremade as Select } from 'src/components/antd/index';
import formInput from 'src/components/formInput/formInput';
import * as formStyled from 'src/components/formInput/style';
import * as Styled from './style';
import WalletInfo from 'src/components/walletInfo/WalletInfo';
import validate from './validation';
import { navigate, Link } from 'gatsby';
import inputFields from './inputFields.tsx';
import { PublicKey, PrivateKey } from '../../models/keys';
import { Transaction as SolanaTransaction } from '@solana/web3.js';
import { ENV_NAME } from '../../config';

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
	let [tokenAccount, setTokenAccount] = useState("");

	const fee = 0;  // TODO: verify fee

	// TODO: move to localization
	const onSubmit = formValues => {
		const { destinationAccount, kinAmount, memo } = formValues;
		if (!tokenAccount || tokenAccount.length == 0) {
			return actions.setTemplateErrors(['A token account is required'])
		}

		if (!store.solana.balances[tokenAccount]) {
			return actions.setTemplateErrors(['Invalid token account'])
		}

		const balance = Number(store.solana.balances[tokenAccount]);
		validate(formValues, balance);
		const amountPlusFee = Number(formValues.kinAmount) + fee;
		if (balance < amountPlusFee) {
			return actions.setTemplateErrors(['Insufficient funds for the requested transfer']);
		}

		const account = store.blockchain.publicKey;
		actions.getSolanaTransaction([
			account,
			tokenAccount,
			destinationAccount,
			kinAmount,
			memo || '',
			store.solana.serviceConfig.tokenProgram,
			store.solana.serviceConfig.subsidizer,
		]);
		actions.setTransactionDataInput({ tokenAccount, destinationAccount, kinAmount, memo });
		setInitial(false);
	};

	const onTokenAccountSelect = val => {
		setTokenAccount(val);
	}

	const onCreateTokenAccount = () => {
		if (store.blockchain.ledgerConnected) {
			actions.createTokenAccountWithLedger([
				store.blockchain.derviationPath,
				store.solana.serviceConfig.tokenProgram,
				store.solana.serviceConfig.token,
				store.solana.serviceConfig.subsidizer,
			]);
		} else {
			actions.createTokenAccount([
				store.blockchain.secret,
				store.solana.serviceConfig.tokenProgram,
				store.solana.serviceConfig.token,
				store.solana.serviceConfig.subsidizer,
			]);
		}
	}

	const onFetchTokenAccounts = () => {
		actions.resolveTokenAccounts(PublicKey.fromString(store.blockchain.publicKey).toBase58());
	}

	useEffect(() => {
		// if publicKey couldnt be retrived
		if (!store.blockchain.publicKey) {
			navigate('/');
			return;
		}

		if (!store.solana.serviceConfig || !store.solana.serviceConfig.tokenProgram) {
			actions.getServiceConfig();
        }
        if (store.solana.tokenAccounts.length == 0 || store.solana.accountUpdateRequired) {
			actions.resolveTokenAccounts(PublicKey.fromString(store.blockchain.publicKey).toBase58());
		}

		// if unsigned transaction have been made & its not on page mount
		if (store.solana.transaction && !initial) navigate('/review-payment');
		if (initial) actions.resetTransactions();
	}, [store.blockchain.account, store.solana.transaction, store.blockchain.publicKey, store.solana.accountUpdateRequired]);

	useEffect(() => {
		actions.resetTemplateErrors();
	}, []);
	const formFields = inputFields.map(item => <Field key={item.name} {...item} component={formInput} />);
	return (
		<TransactionStyled>
			<TransactionContent>
				{/** TODO: visible if !blockhash and !account */}
				<HeaderContainer>
					<H3>MyKinWallet</H3>
				</HeaderContainer>
				{store.blockchain.publicKey && (
					<WalletInfo
                        environment={ENV_NAME}
                        walletAddress={store.blockchain.publicKey}
                        tokenAccounts={store.solana.tokenAccounts}
                        balances={store.solana.balances}
                        ledgerConnected={store.blockchain.ledgerConnected}
                        derivationPath={store.blockchain.derviationPath}
						createTokenAccountFunc={onCreateTokenAccount}
						fetchTokenAccountsFunc={onFetchTokenAccounts}
                        />
				)}

				<GrayedArea visible={store.solana.tokenAccounts.length == 0} className="grayedArea" />
				<Styled.formContainer>
					<H3>Send Kin</H3>
					<formStyled.formLabel>Sender Token Account*<formStyled.subLabel/></formStyled.formLabel>
					<Select
						placeholder="Choose sender token account"
						onChange={val => {
							onTokenAccountSelect(val);
						}}
						list={store.solana.tokenAccounts}
					/>

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
			secret: string;
		},
		solana: {
			tokenAccounts: string[];
			balances: object;
			recentBlockhash: Uint8Array;
			transaction: SolanaTransaction;
			serviceConfig: {
				tokenProgram: Uint8Array;
				token: Uint8Array;
				subsidizer: Uint8Array;
			};
			accountUpdateRequired: boolean;
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
		getServiceConfig: Function;
		getRecentBlockhash: Function;
		getSolanaTransaction: Function;
		setTemplateErrors: Function;
		createTokenAccount: Function;
		createTokenAccountWithLedger: Function;
	};
	handleSubmit: Function;
	validate: Function;
	initialValues: Object;
	location: object;
}
