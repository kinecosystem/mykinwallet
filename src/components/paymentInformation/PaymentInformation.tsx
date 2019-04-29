import React from 'react';
import { H3, P, Button } from 'common/selectors';
import { PaymentInfoStyled, Item } from './style';

interface IPaymentInfo {
	ledger: number;
	amount: number;
	transaction: string;
	time: string;
	balance: number;
}

const PaymentInfo: React.FunctionComponent<IPaymentInfo> = ({ ledger, amount, transaction, time, balance }) => {
	return (
		<PaymentInfoStyled>
			<Item>
				<span>Ledger number</span>
				<div>{ledger}</div>
			</Item>

			<Item>
				<span>Amount</span>
				<div>{amount} KIN</div>
			</Item>

			<Item>
				<span>Transaction ID</span>
				<div>{transaction}</div>
			</Item>

			<Item>
				<span>Created at</span>
				<div>{time}</div>
			</Item>

			<Item>
				<div>
					<span>Balance</span>
					<summary>Source account balance after the transaction</summary>
				</div>
				<div data-item="balance">{balance} KIN</div>
			</Item>
		</PaymentInfoStyled>
	);
};
export default PaymentInfo;
