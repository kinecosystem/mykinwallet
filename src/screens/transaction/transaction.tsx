import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import Template from 'src/components/pageTemplate/template';
import { HeaderContainer } from './style';
import { H3, Button } from 'common/selectors';
import formInput from 'src/components/formInput/formInput';
import { authFormTheme } from 'style/theme/generalVariables';
import * as Styled from './style';
import WalletInfo from 'src/components/walletInfo/WalletInfo';
import validate from './validation';
import { navigate } from 'gatsby';

interface IFormData {
	destinationAccount?: string;
	kinAmount?: string;
	memo?: string;
}

const Index: React.FunctionComponent<InjectedFormProps<IFormData>> = props => {
	return (
		<Template hide="terms" step={2} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
			<Transaction {...props} />
		</Template>
	);
};
interface ITransaction {
	store: {
		errors: string[];
		blockchain: {
			publicKey: string;
			account: object;
			derviationPath: string;
			unsignedTransaction: object;
		};
	};
	actions: {
		getAccount: Function;
		getUnsignedTransaction: Function;
		resetUnsignedTransaction: Function;
		setTransactionDataInput: Function;
	};
	handleSubmit: Function;
}

const Transaction: React.FunctionComponent<ITransaction> = ({ actions, store, handleSubmit, validate, initialValues }) => {
	const [initial, setInitial] = useState(true);
	// TODO: move to localization
	const inputFields: {
		name: string;
		label: string;
		subLabel?: string;
		bottomLabelBold?: string;
		bottomLabelRegular?: string;
		type?: string;
		placeholder: string;
		maxlength?: number;
		max?: number;
		min?: number;
		step?: string;
	}[] = [
		{
			name: 'destinationAccount',
			label: 'Destination account*',
			placeholder: 'Enter destination account address'
		},
		{
			name: 'kinAmount',
			type: 'number',
			label: 'Kin Amount*',
			subLabel: 'The network base fee is 100 Quarks (0.001 kin)',
			placeholder: 'Max amount 100M Kin',
			max: 100000000,
			min: 0.1,
			step: 'any',
			maxlength: 9,
			value: 'asdasd'
		},
		{
			name: 'memo',
			label: 'Memo',
			bottomLabelBold: 'Please Note: ',
			bottomLabelRegular:
				'Some exchanges or swap companies require using a memo. Please check the relevant destination site for specific instructions.',
			placeholder: 'Up to 28 chracters',
			maxlength: 28
		}
	];
	const onSubmit = formValues => {
		validate(formValues);
		const { destinationAccount, kinAmount, memo } = formValues;
		const { account } = store.blockchain;
		// from: account  to: Destination account   amount:Kin Amount   memo:memo
		actions.getUnsignedTransaction([account, destinationAccount, kinAmount, memo || '']);
		actions.setTransactionDataInput({ destinationAccount, kinAmount, memo });
		setInitial(false);
	};
	useEffect(() => {
		if (!store.blockchain.account)
			actions.getAccount(store.blockchain.publicKey);
		if (store.blockchain.unsignedTransaction && !initial) navigate('approve-payment');
	}, [store.blockchain.account, store.blockchain.unsignedTransaction]);

	const formFields = inputFields.map(item => <Field key={item.name} {...item} component={formInput} {...authFormTheme} />);
	console.log(store.blockchain.publicKey);
	return (
		<div>
			<HeaderContainer>
				<H3>My Kin Wallet</H3>
			</HeaderContainer>
			{store.blockchain.account && (
				<WalletInfo
					networkType="Public"
					walletAddress={store.blockchain.publicKey}
					balance={store.blockchain.account.balances[0].balance || 'No balance found'}
				/>
			)}

			<Styled.formContainer>
				<H3>Send Kin</H3>
				<Styled.form initialValues={initialValues} onSubmit={handleSubmit(onSubmit)}>
					{formFields}
					<Styled.ButtonContainer>
						<Button type="submit">Send Payment</Button>
					</Styled.ButtonContainer>
				</Styled.form>
			</Styled.formContainer>
		</div>
	);
};
const mapStateToProps = (state, props) => ({
	initialValues: state.blockchain.transactionForm // retrieve name from redux store
});

export default connect(mapStateToProps)(
	reduxForm({
		form: 'transactionForm',
		validate
	})(Index)
);
