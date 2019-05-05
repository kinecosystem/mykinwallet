const validator = ({ privateKey }) => {
	const errors = {};

	if (privateKey) {
		if (privateKey.length < 15) errors.privateKey = 'To short';
	}
	if (!privateKey) errors.privateKey = 'required';
	return errors;
};

export default validator;
