import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { H3, P, Button } from 'common/selectors';
import { ApprovePaymentStyled } from './style';
import { Link } from 'gatsby';

const IndexPage = props => {
	return (
		<>
			<Template hide="terms" step={1} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
				<ApprovePayment {...props} />
			</Template>
		</>
	);
};

interface IApprovePayment {
	props: {
		store: {
			errors: string[];
		};
		actions: object[];
	};
}

const ApprovePayment: React.FunctionComponent<IApprovePayment> = props => {
	return (
		<ApprovePaymentStyled>
			<H3>Approve Payment</H3>
			<P>Please verify the payment details on your Ledger device and approve the transaction.</P>
			<Link to="/review-payment">
				<Button>Continue</Button>
			</Link>
		</ApprovePaymentStyled>
	);
};
export default IndexPage;
