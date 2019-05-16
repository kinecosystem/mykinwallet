const validator = ({ memo, destinationAccount, kinAmount }) => {
	const errors = {};
	// destination validation
	if (destinationAccount) {
		if (destinationAccount.length !== 56) errors.destinationAccount = 'Destination account not valid';
		if (!destinationAccount.startsWith('G')) errors.destinationAccount = 'Destination account not valid';
	}

	// memo validation
	if (memo) {
		if (memo.length > 28) errors.memo = 'Too long';
	}

	// kin amount validation
	if (kinAmount) {
		if (kinAmount > 100000000) errors.kinAmount = 'Too high';
		if (kinAmount < 0.001) errors.kinAmount = 'Too low';
	}

	// required validation
	if (!kinAmount) errors.kinAmount = 'Required';
	if (!destinationAccount) errors.destinationAccount = 'Required';
	return errors;
};

export default validator;
