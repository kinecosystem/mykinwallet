import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { H3, P, Button } from 'common/selectors';
import { ApprovePaymentStyled } from './style';
import { navigate, Link } from 'gatsby';
import { MessageTextContainer, GoBack } from '../reviewPayment/style';
import { MessageText } from 'src/components/messages/info';
import transactionpb from '@kinecosystem/agora-api/node/transaction/v4/transaction_service_pb';
import { Transaction as SolanaTransaction } from '@solana/web3.js';
import { PrivateKey } from '../../models/keys';

const IndexPage = props => {
	const [isSignOut, setIsSignOut] = useState('signOut');
	const setHideSignOut = value => {
		setIsSignOut(value);
	};
	return (
		<>
			<Template
				hide={isSignOut}
				step={4}
				outOf={5}
				title={{ main: 'MyKinWallet', sub: ['Send your Kin coins to other wallets, exchanges or users.'], page: 'shared' }}
			>
				<ApprovePayment setHideSignOut={setHideSignOut} {...props} />
			</Template>
		</>
	);
};

interface IApprovePayment {
	store: {
		errors: string[];
		blockchain: {
			derviationPath: string;
			unsignedTransaction: string;
			signedTransaction: string;
			transactionSubmitted: string;
			publicKey: string;
		};
		solana: {
			transaction: SolanaTransaction;
			additionalSigners: PrivateKey[];
			signature: Uint8Array;
			submitResponse: transactionpb.SubmitTransactionResponse;
		}
		transactionForm: 	ITransactionForm;
	};
	actions: {
		setSignTransaction: Function;
		setLoader: Function;
		resetTemplateErrors: Function;
		signAndSubmitTransactionWithLedger: Function;
	};
	setHideSignOut: Function;
}

const ApprovePayment: React.FunctionComponent<IApprovePayment> = ({ setHideSignOut, actions, store }) => {
	const [txActionInitiated, setTxActionInitiated] = useState(true);
	// state to prevent auto navigation on error at mounting
	const handleApprove = () => {
		actions.signAndSubmitTransactionWithLedger([store.blockchain.derviationPath, store.solana.transaction, store.solana.additionalSigners])
		actions.resetTemplateErrors();
		setTxActionInitiated(true);
	};
	useEffect(() => {
		if (!store.solana.transaction) navigate('/');
		if (store.errors.length) {
			setHideSignOut(null);
			setTxActionInitiated(false);
		} else {
			setHideSignOut('signOut');
			setTxActionInitiated(true);
		}
		// if transaction was signed
		if (store.solana.signature) navigate('/transaction-approved');
	}, [store.solana.transaction, store.errors, store.solana.submitResponse, store.solana.signature]);
	useEffect(() => {
		// ask use to approve ledger transaction at page load
		actions.signAndSubmitTransactionWithLedger([store.blockchain.derviationPath, store.solana.transaction, store.solana.additionalSigners])
	}, []);
	return (
		<ApprovePaymentStyled>
			{!txActionInitiated && (
				<Link to="/transaction">
					<GoBack>{'<- Edit transaction details'}</GoBack>
				</Link>
			)}
			<H3>Verify payment on ledger</H3>
			<P>Please verify the payment details on your Ledger device and approve the transaction.</P>
			<MessageTextContainer visible={true}>
				<MessageText text="Once you send payment it is not possible to cancel the transaction." />
			</MessageTextContainer>
			{store.errors.length ? <Button onClick={handleApprove}>Try again</Button> : null}
		</ApprovePaymentStyled>
	);
};
export default IndexPage;

interface ITransactionForm {
	tokenAccount: string;
	destinationAccount: string;
	kinAmount: Number;
	memo: string;
}
