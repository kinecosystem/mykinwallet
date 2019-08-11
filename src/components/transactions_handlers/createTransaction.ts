import { navigate } from 'gatsby';

/**
 *
 * @param {Object} store - the transation data
 * @param {Function} create - create a transaction using the SDK
 */

export const createTransactionKeyPair = (store, create) => {
	const { signedTransaction, unsignedTransaction, secret, account } = store.blockchain;

	create({ secret, unsignedTransaction, signedTransaction });
};

/**
 *
 * @param {Object} store - the transation data
 * @param {Function} create - create a transaction using the SDK
 */

export const createTransactionLedger = (store, create) => {
	const { derviationPath, unsignedTransaction, signedTransaction, publicKey } = store.blockchain;
	const { destinationAccount, kinAmount, memo } = store.transactionForm;
	create({
		derviationPath,
		unsignedTransaction,
		signedTransaction,
		tx: { formData: [destinationAccount, kinAmount, memo], publicKey }
	});
};
