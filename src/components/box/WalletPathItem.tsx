import React from 'react';
import { Item, Alert } from './style';
import { navigate } from 'gatsby';

const WalletPathItem = ({ name, img, alert, link }) => {
	const handleClick = link => {
		navigate(`/${link}`);
	};
	return (
		<Item onClick={() => handleClick(link)}>
			<img src={img} alt="icon" />
			<div>{name}</div>
			{alert && <Alert>Not recommended</Alert>}
		</Item>
	);
};

export default WalletPathItem;
