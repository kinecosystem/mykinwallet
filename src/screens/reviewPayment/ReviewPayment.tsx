import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { MessageText } from 'src/components/messages/info';
import { H3, P, Button } from 'common/selectors';
import { ReviewPaymentStyled, GoBack } from './style';
import PaymentInformation from 'src/components/paymentInformation/PaymentInformation';

const IndexPage = props => {
	return (
		<>
			<Template hide='terms' step={1} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
				<ApprovePayment {...props} />
			</Template>
		</>
	);
};

interface IReviewPaymentStyled {
	props: {
		store: {
			errors: string[];
		};
		actions: object[];
	};
}

const ApprovePayment: React.FunctionComponent<IReviewPaymentStyled> = props => {
	return (
		<ReviewPaymentStyled>
			<GoBack>{'<- Edit transaction details'}</GoBack>
			<H3>Review Payment</H3>
			<P>Verify the payment details to continue</P>

			<PaymentInformation
				ledger={123}
				amount={123}
				transaction={'02972d0124ea91a8949ac476862b8b23ea63160a86c35f133a021ce91d2b5cfe'}
				time={'123'}
				balance={123}
			/>
			<MessageText text="Once you send payment it is not possible to cancel the transaction." />
			<Button>Approve</Button>
		</ReviewPaymentStyled>
	);
};
export default IndexPage;
