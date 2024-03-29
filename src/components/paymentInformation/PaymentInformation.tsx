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
	environment: string;
	memo: string;
	createRequired: boolean;
}

const PaymentInfo: React.FunctionComponent<IPaymentInfo> = ({
	purple,
	amount,
	transaction,
	tokenAccount,
	destinationAccount,
	balance,
	environment,
	memo,
	createRequired
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
			{environment && (
				<Item>
					<span>Environment</span>
					<div>{environment}</div>
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
			{/** create required */}
			{createRequired && (
				<Item>
					<div>
						<span>Create Required</span>
						<summary><font color="red">The destination account does not exist. Ensure the destination is correct</font></summary>
					</div>
					<div>Destination account will be created</div>
				</Item>
			)}
		</PaymentInfoStyled>
	);
};
export default PaymentInfo;
