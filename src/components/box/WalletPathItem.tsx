import React, { useEffect, useState, useRef } from 'react';
import { Item, Alert } from './style';
import { navigate } from 'gatsby';

const WalletPathItem = ({ name, img, alert, link, actions, store }) => {
	const [ableNavigate, setAbleNavigate] = useState(false);

	useEffect(() => {
		const { ledgerConnected } = store.blockchain;
		
		if (ledgerConnected && ableNavigate && name === 'Ledger') {
			navigate(`/ledger`);
		}
	}, [store.blockchain.ledgerConnected, ableNavigate]);

	const handleClick = () => {
		if (name === 'Ledger') {
			// check if ledger connected
			actions.isLedgerConnected();
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
			<div>{name}</div>
			{alert && <Alert>Not recommended</Alert>}
		</Item>
	);
};

export default WalletPathItem;
