import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import Layout from 'src/components/layout';
import { purpleLight } from 'style/theme/generalVariables';
import Title from 'src/components/title/title';
import { Structure_container, SideContainer, SideContainer_content, Github } from './style';
import Progressbar from 'src/components/progress/Line';
import Footer from './Footer';
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
	requestPublicKey,
	getPublicKey,
	getAccount,
	resetAll,
	getIsKeyPairValid,
	setSignTransactionKeyPair,
	setLoader,
	setAccount,
	resetTransactions,
	resetPublicKeyData,
	resolveTokenAccounts,
	getAccountInfo,
	getServiceConfig,
	getRecentBlockhash,
	getSolanaTransaction,
	signAndSubmitTransaction,
	signAndSubmitTransactionWithLedger,
	createTokenAccount,
	createTokenAccountWithLedger,
	setAccountUpdateRequired,
} from 'src/store/actions/site/actions';
import { bindActionCreators } from 'redux';
import { Location } from '@reach/router';

interface ITemplateProps {
	title: {
		main: string;
		sub: string;
		page?: string;
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
					page={title.page}
				/>

				{/** right white container */}
				<SideContainer>
					<SideContainer_content>
						{step && <Progressbar step={step} outOf={outOf} />}
						<Messages show={atleastTwoErrorsInHomepage > 1} path={location.pathname} errors={store.errors} />
						{childrenWithProps}
						<Footer resetAll={actions.resetAll} store={store} path={location.pathname} hide={hide} />
					</SideContainer_content>
				</SideContainer>
				{github && (
					<a href="https://github.com/kinecosystem/mykinwallet" target="__blank" rel='noreferrer'>
						<Github>Github &rarr; </Github>
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
			solana: state.blockchain.solana,
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
				requestPublicKey,
				getAccount,
				resetTemplateErrors,
				setTemplateErrors,
				isLedgerConnected,
				getPublicKey,
				getIsKeyPairValid,
				setSignTransactionKeyPair,
				setAccount,
				resetTransactions,
				resetPublicKeyData,
				resolveTokenAccounts,
				getAccountInfo,
				getServiceConfig,
				getRecentBlockhash,
				getSolanaTransaction,
				signAndSubmitTransaction,
				signAndSubmitTransactionWithLedger,
				createTokenAccount,
				createTokenAccountWithLedger,
				setAccountUpdateRequired
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
	requestPublicKey: Function;
	getPublicKey: Function;
	getIsKeyPairValid: Function;
	setSignTransactionKeyPair: Function;
	setAccount: Function;
	resetTransactions: Function;
	resetPublicKeyData: Function;
	resolveTokenAccounts: Function;
	getAccountInfo: Function;
	getServiceConfig: Function;
	getRecentBlockhash: Function;
	getSolanaTransaction: Function;
	signAndSubmitTransaction: Function;
	signAndSubmitTransactionWithLedger: Function;
	createTokenAccount: Function;
	createTokenAccountWithLedger: Function;
	setAccountUpdateRequired: Function;
}
