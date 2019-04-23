import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import Template from 'src/components/pageTemplate/template';
import { HeaderContainer } from 'src/screens/homepage/style';
import { H3 } from 'common/selectors';
import formInput from './../../components/formInput/formInput';
import { authFormTheme } from './../../style/theme/generalVariables';
import * as Styled from './style';

interface IFormData {
	destinationAccount?: string;
	kinAmount?: string;
	memo?: string;
}

const Transaction: React.FunctionComponent<InjectedFormProps<IFormData>> = props => {
	// TODO: move to localization
	const inputFields: {
		name: string;
		label: string;
		subLabel?: string;
		bottomLabelBold?: string;
		bottomLabelRegular?: string;
		type?: string;
		placeholder: string;
	}[] = [
		{
			name: 'destinationAccount',
			label: 'Destination account*',
			placeholder: 'Enter destination account address'
		},
		{
			name: 'kinAmount',
			label: 'Kin Amount*',
			subLabel: 'The network base fee is 100 Quarks (0.001 kin)',
			placeholder: 'Max amount 100M Kin'
		},
		{
			name: 'memo',
			label: 'Memo',
			bottomLabelBold: 'Please Note: ',
			bottomLabelRegular:
				'Some exchanges or swap companies require using a memo. Please check the relevant destination site for specific instructions.',
			placeholder: 'Up to 28 chracters'
		}
	];

	const onSubmit = formValues => {};

	const { handleSubmit } = props;
	const formFields = inputFields.map(item => <Field key={item.name} {...item} component={formInput} {...authFormTheme} />);
	return (
		<Template step={2} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
			<HeaderContainer>
				<H3>My Kin Wallet</H3>
			</HeaderContainer>

			<Styled.formContainer>
				<H3>Send Kin</H3>
				<Styled.form onSubmit={handleSubmit(onSubmit)}>{formFields}</Styled.form>
			</Styled.formContainer>
		</Template>
	);
};

const transactionFormComponent = reduxForm({
	form: 'transactionForm'
})(Transaction);

export default connect()(transactionFormComponent);
