const validator = ({ privateKey }) => {
	const errors = {};

	if (privateKey) {
		if (privateKey.length < 56) errors.privateKey = 'To short';
	}
	if (!privateKey) errors.privateKey = 'Cannot be empty';
	return errors;
};

export default validator;
