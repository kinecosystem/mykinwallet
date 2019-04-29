const validator = ({ memo, destinationAccount, kinAmount }) => {
	const errors = {};
	if (memo) {
		if (memo.length > 28) errors.memo = 'Too long';
	}
	if (destinationAccount) {
		if (destinationAccount.length > 28) errors.destinationAccount = 'To long';
	}
	if (kinAmount) {
		if (kinAmount > 100000000) errors.kinAmount = 'Too high';
	}
	return errors;
};

export default validator;
