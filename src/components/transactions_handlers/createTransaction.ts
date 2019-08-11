import { navigate } from 'gatsby';

/**
 *
 * @param {Object} store - the transation data
 * @param {Function} create - create a transaction using the SDK
 */

export const createTransactionKeyPair = (data, create) => {
	const { signedTransaction, unsignedTransaction, secret, account } = data;

	create({ secret, unsignedTransaction, signedTransaction });
};

/**
 *
 * @param {Object} store - the transation data
 * @param {Function} create - create a transaction using the SDK
 */

export const createTransactionLedger = (data, create) => {
	const { signedTransaction, unsignedTransaction, secret, account } = data;

	create({ ...data });
};
