const validator = ({ privateKey }) => {
	const errors = {};
	if (privateKey) {
		if (privateKey.length < 15) errors.privateKey = 'To short';
	}
	return errors;
};

export default validator;
