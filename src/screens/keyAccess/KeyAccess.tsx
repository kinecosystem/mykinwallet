import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { KeyAccessContainer, TitleContainer, Form, ButtonContainer, CheckboxContainer } from './style';
import { authFormTheme } from 'style/theme/generalVariables';
import { H3, Button } from 'common/selectors';
import formInput from 'src/components/formInput/formInput';
import { CheckboxPremade as Checkbox } from 'src/components/antd/index';
import validate from './validation';
import Modal from 'src/components/modals/terms/Terms';
import { navigate, Link } from 'gatsby';
import { actionChannel } from 'redux-saga/effects';

interface IFormData {
	PrivateKey?: string;
}

const IndexPage: React.FunctionComponent<InjectedFormProps<IFormData>> = props => {
	return (
		<Template step={1} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
			<KeyAccess {...props} />
		</Template>
	);
};

interface IKeyAccess {
	store: {
		errors: string[];
		blockchain: {
			keyPairValid: boolean;
			publicKey: 'GBT7A2GIYNZEQ3BP3FNPRHCUGZTRWVHFUKXHELIF2F4XW2WFB4QLKXML';
		};
	};
	actions: object[];
	handleSubmit: Function;
}

const KeyAccess: React.FunctionComponent<IKeyAccess> = props => {
	const [errors, setErrors] = useState([
		'This is NOT a recommended way of accessing a wallet. This information is sensitive, and these options should only.'
	]);
	const [terms, setTerms] = useState(false);
	// TODO: move to localization
	const inputFields: {
		name: string;
		label: string;
		placeholder: string;
	}[] = [
		{
			name: 'privateKey',
			label: 'Private Key',
			placeholder: 'Enter your private key'
		}
	];

	useEffect(() => {
		const { actions, store } = props;
		
		actions.setTemplateErrors([/*...store.errors,*/ ...errors]);
		if (store.blockchain.keyPairValid) {
			navigate('/transaction');
		}
	}, [errors, props.store.blockchain.keyPairValid]);

	const handleCheckbox = ({ target }) => {
		setTerms(target.checked);
	};

	const { handleSubmit } = props;
	const formFields = inputFields.map(item => <Field key={item.name} {...item} component={formInput} {...authFormTheme} />);

	const onSubmit = formValues => {
		if (terms) {
			props.actions.getIsKeyPairValid(formValues.privateKey);
		}
	};

	return (
		<KeyAccessContainer>
			<TitleContainer>
				<H3>Access by private key</H3>
			</TitleContainer>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{formFields}
				<div>
					<CheckboxContainer>
						<Checkbox onChange={handleCheckbox}>To access my wallet, I accept the</Checkbox>
						<Link to="/terms-and-conditions" state={{ lastPage: 'key-access' }}>
							<span className="terms"> terms. </span>
						</Link>
					</CheckboxContainer>
					<ButtonContainer>
						<Button type="submit">Access my wallet</Button>
					</ButtonContainer>
				</div>
			</Form>
		</KeyAccessContainer>
	);
};

const KeyAccessFormComponent = reduxForm({
	form: 'KeyAccessForm',
	validate
})(IndexPage);
export default KeyAccessFormComponent;
