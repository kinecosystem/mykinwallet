import React from 'react';
import { PaymentInfoStyled, Item } from './style';
import moment from 'moment'

interface IPaymentInfo {
	ledger: number;
	amount: number;
	transaction: string;
	time: string;
	balance: number;
	purple: string;
	publicAddress: string;
	network: string;
	memo: string;
}

const PaymentInfo: React.FunctionComponent<IPaymentInfo> = ({
	purple,
	ledger,
	amount,
	transaction,
	publicAddress,
	balance,
	network,
	memo
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
			{/** AMOUNT */}
			{amount && (
				<Item>
					<span>Amount</span>
					<div>{amount} KIN</div>
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
			<Item>
				<span>Created at</span>
				<div>{moment().format("YYYY-MM-DD HH:mm")}</div>
			</Item>
			{/** memo */}
			{memo && (
				<Item>
					<span>Memo</span>
					<div>{memo}</div>
				</Item>
			)}
			{/** BALANCE */}
			{balance && (
				<Item>
					<div>
						<span>Balance</span>
						<summary>Source account balance after the transaction</summary>
					</div>
					<div data-item="balance">{balance} KIN</div>
				</Item>
			)}
		</PaymentInfoStyled>
	);
};
export default PaymentInfo;
