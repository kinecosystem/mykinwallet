import types from './types';

// ledger connection
export const isLedgerConnected = payload => {
	return {
		type: types.IS_LEDGER_CONNECTED,
		payload
	};
};
export const setLedgerConnected = payload => {
	return {
		type: types.SET_IS_LEDGER_CONNECTED,
		payload
	};
};

// public key
export const getPublicKey = payload => {
	return {
		type: types.GET_PUBLIC_KEY,
		payload
	};
};
export const setPublicKey = payload => {
	return {
		type: types.SET_PUBLIC_KEY,
		payload
	};
};

//derivation path
export const setDerivationPath = payload => {
	return {
		type: types.SET_DERIVATION_PATH,
		payload
	};
};

// account
export const getAccount = payload => {
	return {
		type: types.GET_ACCOUNT,
		payload
	};
};
export const setAccount = payload => {
	return {
		type: types.SET_ACCOUNT,
		payload
	};
};

// transaction detailes

export const setTransactionDataInput = payload => {
	return {
		type: types.SET_TRANSACTION_DATA,
		payload
	};
};
export const resetTransactions = payload => {
	return {
		type: types.RESET_TRANSACTION_DATA,
		payload
	};
};

//transaction

export const resetUnsignedTransaction = payload => {
	return {
		type: types.RESET_UNSIGNED_TRANSACTION,
		payload
	};
};
export const getUnsignedTransaction = payload => {
	return {
		type: types.GET_UNSIGNED_TRANSACTION,
		payload
	};
};
export const setUnsignedTransaction = payload => {
	return {
		type: types.SET_UNSIGNED_TRANSACTION,
		payload
	};
};

export const resetAll = payload => {
	return {
		type: types.RESET_ALL,
		payload
	};
};

export const setSignTransaction = payload => {
	return {
		type: types.SET_SIGN_TRANSACTION,
		payload
	};
};

// keyPair
export const getIsKeyPairValid = payload => {
	return {
		type: types.GET_IS_KEYPAIR_VALID,
		payload
	};
};

export const setSignTransactionKeyPair = payload => {
	return {
		type: types.SET_SIGN_TRANSACTION_KEYPAIR,
		payload
	};
};

/// LOADER
export const setLoader = payload => {
	return {
		type: types.SET_LOADER,
		payload
	};
};

// Terms
export const setTerms = () => {
	return {
		type: types.SET_TERMS
	};
};
