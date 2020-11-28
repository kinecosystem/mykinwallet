const validator = ({ privateKey }) => {
	const errors = {};

	if (privateKey) {
		if (privateKey[0] == 'S' && privateKey.length != 56) {
			errors.privateKey = 'Too short';
		}
	}
	if (!privateKey) errors.privateKey = 'Cannot be empty';
	return errors;
};

export default validator;
