import React from 'react';
import { H3, P, Button } from 'common/selectors';
import { PaymentInfoStyled, Item } from './style';

interface IPaymentInfo {
	ledger: number;
	amount: number;
	transaction: string;
	time: string;
	balance: number;
	purple: string;
	publicAddress: string;
	network: string;
}

const PaymentInfo: React.FunctionComponent<IPaymentInfo> = ({
	purple,
	ledger,
	amount,
	transaction,
	publicAddress,
	balance,
	network
}) => {
	return (
		<PaymentInfoStyled border={purple === 'purple'}>
			{/** LEDGER */}
			{ledger && (
				<Item>
					<span>Ledger number</span>
					<div>{ledger}</div>
				</Item>
			)}
			{network && (
				<Item>
					<span>Network</span>
					<div>{network}</div>
				</Item>
			)}

			{/** TRANSACTION */}
			{transaction && (
				<Item>
					<span>Transaction ID</span>
					<div>{transaction}</div>
				</Item>
			)}

			{/** PUBLIC ADDRESS */}
			{publicAddress && (
				<Item>
					<span>Wallet's public address</span>
					<div>{publicAddress}</div>
				</Item>
			)}
			{/** AMOUNT */}
			{amount && (
				<Item>
					<span>Amount</span>
					<div>{amount} KIN</div>
				</Item>
			)}

			{/** BALANCE */}
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
