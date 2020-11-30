import React from 'react';
import { PaymentInfoStyled, Item } from './style';
import moment from 'moment'

interface IPaymentInfo {
	amount: number;
	transaction: string;
	time: string;
	balance: number;
	purple: string;
	tokenAccount: string;
	destinationAccount: string;
	network: string;
	memo: string;
}

const PaymentInfo: React.FunctionComponent<IPaymentInfo> = ({
	purple,
	amount,
	transaction,
	tokenAccount,
	destinationAccount,
	balance,
	network,
	memo
}) => {
	return (
		<PaymentInfoStyled border={purple === 'purple'}>
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

			{/** TOKEN ACCOUNT ADDRESS */}
			{tokenAccount && (
				<Item>
					<span>Token account address</span>
					<div>{tokenAccount}</div>
				</Item>
			)}

			{/** DESTINATION ADDRESS */}
			{destinationAccount && (
				<Item>
					<span>Destination account address</span>
					<div>{destinationAccount}</div>
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
