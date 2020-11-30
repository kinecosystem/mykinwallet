import type from '../../actions/site/types';

const initialState = {
	blockchain: {
		terms: false,
		ledgerConnected: false
	},
	solana: {
		tokenAccounts: [],
		balances: {}
	},
	transactionForm: {},
	loading: false
};

export default function(state = initialState, action: any) {
	switch (action.type) {
		case type.SET_IS_LEDGER_CONNECTED: {
			return { ...state, blockchain: { ...state.blockchain, ...action.payload } };
		}
		case type.SET_PUBLIC_KEY:
		case type.SET_IS_KEYPAIR_VALID:
		case type.SET_ACCOUNT:
		case type.SET_UNSIGNED_TRANSACTION: {
			return { ...state, blockchain: { ...state.blockchain, ...action.payload } };
		}
		case type.SET_DERIVATION_PATH: {
			return { ...state, blockchain: { ...state.blockchain, derviationPath: action.payload } };
		}
		case type.RESET_UNSIGNED_TRANSACTION: {
			return { ...state, blockchain: { ...state.blockchain, unsignedTransaction: false } };
		}
		case type.SET_TRANSACTION_DATA: {
			return { ...state, transactionForm: { ...state.transactionForm, ...action.payload } };
		}
		case type.SIGN_TRANSACTION:
		case type.SIGN_TRANSACTION_KEYPAIR: {
			return { ...state, blockchain: { ...state.blockchain, signedTransaction: action.payload } };
		}
		case type.SUBMIT_TRANSACTION: {
			return { ...state, blockchain: { ...state.blockchain, transactionSubmitted: action.payload } };
		}
		case type.SET_TERMS: {
			return { ...state, blockchain: { ...state.blockchain, terms: true } };
		}
		case type.RESET_ALL: {
			return { ...state, blockchain: {}, transactionForm: {}, solana: { tokenAccounts: [], balances: {} } };
		}
		case type.SET_LOADER: {
			return { ...state, loading: action.payload };
		}
		case type.RESET_TRANSACTION_DATA: {
			return { ...state, blockchain: { ...state.blockchain, signedTransaction: false, unsignedTransaction: false } };
		}
		case type.SET_SERVICE_CONFIG:
		case type.SET_RECENT_BLOCKHASH:
		case type.SET_TOKEN_ACCOUNTS:
		case type.SET_SOLANA_TRANSACTION:
		case type.SET_SUBMITTED_TRANSACTION: {
			console.log({ ...state, solana: { ...state.solana, ...action.payload } });
			return { ...state, solana: { ...state.solana, ...action.payload } };
		}
		case type.SET_ACCOUNT_INFO: {
			return { ...state, solana: { ...state.solana, balances: { ...state.solana.balances, ...action.payload } } };
		}
		default:
			return state;
	}
}
