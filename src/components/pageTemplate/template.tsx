import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import Layout from 'src/components/layout';
import { purpleLight } from 'style/theme/generalVariables';
import Title from 'src/components/title/title';
import { Structure_container, SideContainer, SideContainer_content, Github } from './style';
import Progressbar from 'src/components/progress/Line';
import Conditions from './Conditions';
import Messages from './handleErrors';
import { connect } from 'react-redux';
import { setTemplateErrors, resetTemplateErrors } from 'src/store/actions/errors/actionsErrors';
import {
	setTransactionDataInput,
	setDerivationPath,
	setSignTransaction,
	getUnsignedTransaction,
	resetUnsignedTransaction,
	isLedgerConnected,
	getPublicKey,
	getAccount,
	resetAll,
	getIsKeyPairValid,
	setSignTransactionKeyPair,
	setLoader,
	setAccount,
	resetTransactions
} from 'src/store/actions/site/actions';
import { bindActionCreators } from 'redux';
import { Location } from '@reach/router';

interface ITemplateProps {
	title: {
		main: string;
		sub: string;
	};
	step: number;
	outOf: number;
	children: ReactNode;
	actions: Iactions;
	github: boolean;
	hide: string;
	location: {
		pathname: string;
	};
	store: { errors: Array<string>; loading: boolean };
}

const Template: FunctionComponent<ITemplateProps> = props => {
	const { title, step, outOf, children, actions, store, github, hide, location } = props;
	const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, { actions, store, location }));
	const [atleastTwoErrorsInHomepage, setAtleastTwoErrorsInHomepage] = useState(0);
	useEffect(() => {
		/** clean store errors every time component unmount */
		return () =>
			//approve-payment page will not clean errors
			location.pathname !== '/approve-payment' && actions.resetTemplateErrors([]);
	}, []);
	useEffect(() => {
		window.scrollTo(0, 0);
		if (location.pathname === '/') store.errors[0] && setAtleastTwoErrorsInHomepage(atleastTwoErrorsInHomepage + 1);
	}, [store.errors]);
	return (
		<Layout background={purpleLight} loading={store.loading}>
			<Structure_container>
				{/** Left white title */}

				<Title
					handleClick={() => {
						actions.resetAll();
						actions.resetTemplateErrors([]);
					}}
					main={title.main}
					sub={title.sub}
				/>

				{/** right white container */}
				<SideContainer>
					<SideContainer_content>
						{step && <Progressbar step={step} outOf={outOf} />}
						<Messages show={atleastTwoErrorsInHomepage > 1} path={location.pathname} errors={store.errors} />
						{childrenWithProps}
						<Conditions path={location.pathname} hide={hide} />
					</SideContainer_content>
				</SideContainer>
				{github && (
					<a href="https://github.com/kinecosystem/mykinwallet" target="__blank">
						<Github>Github -></Github>
					</a>
				)}
			</Structure_container>
		</Layout>
	);
};

const mapStateToProps = state => {
	return {
		store: {
			errors: state.errors.errors,
			blockchain: state.blockchain.blockchain,
			transactionForm: state.blockchain.transactionForm,
			loading: state.blockchain.loading
		}
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(
			{
				setLoader,
				resetAll,
				setTransactionDataInput,
				resetUnsignedTransaction,
				setDerivationPath,
				getUnsignedTransaction,
				setSignTransaction,
				getAccount,
				resetTemplateErrors,
				setTemplateErrors,
				isLedgerConnected,
				getPublicKey,
				getIsKeyPairValid,
				setSignTransactionKeyPair,
				setAccount,
				resetTransactions
			},
			dispatch
		)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(props => <Location>{locationProps => <Template {...locationProps} {...props} />}</Location>);

interface Iactions {
	setLoader: Function;
	resetAll: Function;
	setTransactionDataInput: Function;
	resetUnsignedTransaction: Function;
	setDerivationPath: Function;
	getUnsignedTransaction: Function;
	setSignTransaction: Function;
	getAccount: Function;
	resetTemplateErrors: Function;
	setTemplateErrors: Function;
	isLedgerConnected: Function;
	getPublicKey: Function;
	getIsKeyPairValid: Function;
	setSignTransactionKeyPair: Function;
	setAccount: Function;
	resetTransactions: Function;
}
