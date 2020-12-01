const IntlNumber = number => new Intl.NumberFormat('ja-JP').format(number);

const balanceCalculator = (balance, amount, fee = 0) => {
	const amountWithFee = amount + fee;
	return IntlNumber(balance - amountWithFee);
};

export default balanceCalculator;
