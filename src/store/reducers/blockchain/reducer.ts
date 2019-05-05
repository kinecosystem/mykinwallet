import type from '../../actions/site/types';

const initialState = {
	blockchain: {},
	transactionForm: {}
};

export default function(state = initialState, action: any) {
	switch (action.type) {
		case type.SET_IS_LEDGER_CONNECTED: {
			return { ...state, blockchain: action.payload };
		}
		case type.SET_PUBLIC_KEY: {
			return { ...state, blockchain: { ...state.blockchain, ...action.payload } };
		}
		case type.SET_IS_KEYPAIR_VALID: {
			return { ...state, blockchain: { ...state.blockchain, ...action.payload } };
		}
		case type.SET_ACCOUNT: {
			return { ...state, blockchain: { ...state.blockchain, ...action.payload } };
		}
		case type.SET_DERIVATION_PATH: {
			return { ...state, blockchain: { ...state.blockchain, derviationPath: action.payload } };
		}
		case type.SET_UNSIGNED_TRANSACTION: {
			return { ...state, blockchain: { ...state.blockchain, ...action.payload } };
		}
		case type.RESET_UNSIGNED_TRANSACTION: {
			return { ...state, blockchain: { ...state.blockchain, unsignedTransaction: false } };
		}
		case type.SET_TRANSACTION_DATA: {
			return { ...state, transactionForm: { ...state.transactionForm, ...action.payload } };
		}
		case type.SIGN_TRANSACTION: {
			return { ...state, blockchain: { ...state.blockchain, signedTransaction: action.payload } };
		}
		case type.SIGN_TRANSACTION_KEYPAIR: {
			return { ...state, blockchain: { ...state.blockchain, signedTransaction: action.payload } };
		}
		case type.RESET_ALL: {
			return { ...state, blockchain: {}, transactionForm: {} };
		}
		default:
			return state;
	}
}
