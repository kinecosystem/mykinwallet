import React, { useEffect, useState, useRef } from 'react';
import { Item, Alert } from './style';
import { navigate } from 'gatsby';

const WalletPathItem = ({ type, img, alert, link, actions, store, title }) => {
	const [ableNavigate, setAbleNavigate] = useState(false);
	// let reCheck = useRef(null);
	// let LoaderSet = useRef(null);
	useEffect(() => {
		const { ledgerConnected } = store.blockchain;

		if (ledgerConnected && ableNavigate && type === 'ledger') {
			// actions.setLoader(false);
			navigate(`/ledger`);
			// return () => {
			// 	clearTimeout(reCheck.current);
			// 	clearTimeout(LoaderSet.current);
			// };
		}
	}, [store.blockchain.ledgerConnected, ableNavigate]);

	const handleClick = () => {
		if (type === 'ledger') {
			// check if ledger connected
			actions.isLedgerConnected();
			actions.setLoader(true);
			actions.isLedgerConnected();
			// reCheck.current = setTimeout(() => {
			// 	actions.isLedgerConnected();
			// 	LoaderSet.current = setTimeout(() => {
			// 		actions.setLoader(false);
			// 	}, 29500);
			// }, 0);
			// prevent auto navigate in cdu
			setAbleNavigate(true);
		} else {
			// navigate to key pair wallet
			setAbleNavigate(true);
			navigate(`/${link}`);
		}
	};
	return (
		<Item onClick={handleClick}>
			<img src={img} alt="icon" />
			<div>{title}</div>
			{alert && <Alert>Not recommended</Alert>}
		</Item>
	);
};

export default WalletPathItem;
