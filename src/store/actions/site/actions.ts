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

// Solana
export const resolveTokenAccounts = payload => {
	return {
		type: types.RESOLVE_TOKEN_ACCOUNTS,
		payload
	};
};
export const setTokenAccounts = payload => {
	return {
		type: types.SET_TOKEN_ACCOUNTS,
		payload
	};
};
export const getAccountInfo = payload => {
	return {
		type: types.GET_ACCOUNT_INFO,
		payload
	};
};
export const setAccountInfo = payload => {
	return {
		type: types.SET_ACCOUNT_INFO,
		payload
	};
};
export const getServiceConfig = () => {
	return {
		type: types.GET_SERVICE_CONFIG
	};
};
export const setServiceConfig = payload => {
	return {
		type: types.SET_SERVICE_CONFIG,
		payload
	};
};
export const getRecentBlockhash = () => {
	return {
		type: types.GET_RECENT_BLOCKHASH
	};
};
export const setRecentBlockhash = payload => {
	return {
		type: types.SET_RECENT_BLOCKHASH,
		payload
	};
};
export const getSolanaTransaction = payload => {
	return {
		type: types.GET_SOLANA_TRANSACTION,
		payload
	};
};
export const setSolanaTransaction = payload => {
	return {
		type: types.SET_SOLANA_TRANSACTION,
		payload
	};
};
export const signAndSubmitTransaction = payload => {
	return {
		type: types.SIGN_AND_SUBMIT_TRANSACTION,
		payload
	};
};
export const signAndSubmitTransactionWithLedger = payload => {
	return {
		type: types.SIGN_AND_SUBMIT_TRANSACTION_LEDGER,
		payload
	};
};
export const setSubmittedTransaction = payload => {
	return {
		type: types.SET_SUBMITTED_TRANSACTION,
		payload
	};
};
export const createTokenAccount = payload => {
	return {
		type: types.CREATE_TOKEN_ACCOUNT,
		payload
	};
};
export const createTokenAccountWithLedger = payload => {
	return {
		type: types.CREATE_TOKEN_ACCOUNT_LEDGER,
		payload
	};
};
export const setAccountUpdateRequired = payload => {
	return {
		type: types.SET_ACCOUNT_UPDATE_REQUIRED,
		payload
	};
};
