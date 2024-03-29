import bs58 from 'bs58';

function validateStellarAddress(destinationAccount: string, errors: Object) {
	if (destinationAccount.length !== 56 || !destinationAccount.startsWith('G')) {
		errors.destinationAccount = 'Destination account not valid';
	}
}

const validator = ({ tokenAccount, memo, destinationAccount, kinAmount }) => {
	const errors = {};
	// destination validation
	if (destinationAccount) {
		try {
			const decoded = bs58.decode(destinationAccount);
			if (decoded.length != 32) {
				validateStellarAddress(destinationAccount, errors);
			}
		} catch (error) {
			validateStellarAddress(destinationAccount, errors);
		}
	}

	if (tokenAccount) {
		try {
			const decoded = bs58.decode(tokenAccount);
			if (decoded.length != 32) {
				errors.tokenAccount = 'Token account not valid';
			}
		} catch (error) {
			errors.tokenAccount = 'Token account not valid';
		}
	}

	// memo validation
	if (memo) {
		if (memo.length > 28) errors.memo = 'Too long';
	}

	// kin amount validation
	if (kinAmount) {
		if (kinAmount > 500000000) errors.kinAmount = 'Too high';
		if (kinAmount < 0.001) errors.kinAmount = 'Too low';
	}

	// required validation
	if (!kinAmount) errors.kinAmount = 'Cannot be empty / Not a valid number';
	if (!destinationAccount) errors.destinationAccount = 'Cannot be empty';
	if (!tokenAccount) errors.tokenAccount = 'Cannot be empty';
	return errors;
};

export default validator;
