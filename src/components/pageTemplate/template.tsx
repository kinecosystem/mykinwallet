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
	setLoader
} from 'src/store/actions/site/actions';
import { bindActionCreators } from 'redux';
import { Location } from '@reach/router';

interface ITemplateProps {
	title: {
		main: string;
		sub: string;
	};
	step: number;
	children: ReactNode;
	actions: object;
	github: boolean;
	hide: string;
	location: Object;
	store: Object;
}

const Template: FunctionComponent<ITemplateProps> = props => {
	const { title, step, children, actions, store, github, hide, location } = props;
	const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, { actions, store, location }));

	useEffect(() => {
		/** clean store errors every time component unmount */
		return () => actions.resetTemplateErrors([]);
	}, []);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [store.errors]);
	return (
		<Layout background={purpleLight} loading={store.loading}>
			<Structure_container>
				{/** Left white title */}
				<Title main={title.main} sub={title.sub} />
				{/** right white container */}
				<SideContainer>
					<SideContainer_content>
						<Progressbar step={step} />
						<Messages path={location.pathname} errors={store.errors} />
						{childrenWithProps}
						<Conditions path={location.pathname} hide={hide} />
					</SideContainer_content>
				</SideContainer>
				{github && <Github>Github -></Github>}
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
				setSignTransactionKeyPair
			},
			dispatch
		)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(props => <Location>{locationProps => <Template {...locationProps} {...props} />}</Location>);
