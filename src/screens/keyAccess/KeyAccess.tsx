import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { KeyAccessContainer, TitleContainer, Form, ButtonContainer } from './style';
import { authFormTheme } from 'style/theme/generalVariables';
import { H3, Button } from 'common/selectors';
import formInput from 'src/components/formInput/formInput';
import validate from './validation';
import { navigate } from 'gatsby';
interface IFormData {
	PrivateKey?: string;
}

const IndexPage: React.FunctionComponent<InjectedFormProps<IFormData>> = props => {
	return (
		<Template step={1} outOf={4} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
			<KeyAccess {...props} />
		</Template>
	);
};

interface IKeyAccess {
	store: {
		errors: string[];
		blockchain: {
			keyPairValid: boolean;
			publicKey: string;
			terms: boolean;
		};
	};
	actions: object[];
	handleSubmit: Function;
}

const KeyAccess: React.FunctionComponent<IKeyAccess> = props => {
	const [errors] = useState([
		<span>
			<b>This method is NOT recommended as it is not secure.</b> It should only be used in{' '}
			<a target="__blank" href="https://github.com/kinecosystem/mykinwallet">
				offline
			</a>{' '}
			settings by experienced crypto users.
		</span>
	]);
	const [initial, setInitial] = useState(false);
	// TODO: move to localization
	const inputFields: {
		name: string;
		label: string;
		placeholder: string;
		special: boolean;
		notGroup: boolean;
	}[] = [
		{
			name: 'privateKey',
			label: 'Private Key',
			special: true,
			placeholder: 'Enter your private key',
			notGroup: true
		}
	];

	useEffect(() => {
		const { actions, store } = props;
		actions.setTemplateErrors([/*...store.errors,*/ ...errors]);
		if (store.blockchain.keyPairValid && initial) {
			if (!store.blockchain.terms) {
				navigate('/terms-and-conditions', { state: { lastPage: 'key-access' } });
			} else {
				navigate('/transaction', { state: { type: 'key-access' } });
			}
		}
	}, [errors, props.store.blockchain.keyPairValid, initial]);

	useEffect(() => {
		const { actions, store } = props;
		if (initial) actions.setTemplateErrors([...store.errors]);
	}, [errors, initial]);

	const { handleSubmit } = props;
	const formFields = inputFields.map(item => <Field key={item.name} {...item} component={formInput} {...authFormTheme} />);

	const onSubmit = formValues => {
		props.actions.getIsKeyPairValid(formValues.privateKey);
		setInitial(true);
	};

	return (
		<KeyAccessContainer>
			<TitleContainer>
				<H3>Access by private key</H3>
			</TitleContainer>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{formFields}
				<ButtonContainer>
					<Button type="submit">Access my wallet</Button>
				</ButtonContainer>
			</Form>
		</KeyAccessContainer>
	);
};

const KeyAccessFormComponent = reduxForm({
	form: 'KeyAccessForm',
	validate
})(IndexPage);
export default KeyAccessFormComponent;
