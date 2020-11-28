import React from 'react';
import { RecentBlockhashContainer, RecentBlockhashInfoItem } from './style';
import handleCopy from '../../components/helpers/copy';
import showAddress from '../helpers/showAddressOnLedger';

interface IRecentBlockhash {
	recentBlockhash: Uint8Array;
}
const IntlNumber = number => new Intl.NumberFormat('ja-JP').format(number);

const RecentBlockhash = (props: IRecentBlockhash) => {
	return (
		<RecentBlockhashContainer>
			<RecentBlockhashInfoItem>
				<div className="WalletInfoItem__container">
					<span>Recent Blockhash</span>
					<span className="recent-blockhash">{props.recentBlockhash}</span>
				</div>
			</RecentBlockhashInfoItem>
		</RecentBlockhashContainer>
	);
};

export default RecentBlockhash;
