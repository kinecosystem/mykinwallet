import { blockchainExplorerActionTypes } from '../../actionConsts/site/blockchainExplorer';
import { IBlockchainState } from '../../interfaces/site/blockChainExplorer';

const initalState: IBlockchainState = {
	latestTransactions: [],
	latestLedgers: [],
	prodactPage: {},
	pageOperations: {},
	accountPage: {},
	accountRecentActivity: {},
	legersTransactions: {},
	nextLinkTransaction: '',
	nextLinkLegers: '',
	type: 'public'
};

export default function(state = initalState, action: any) {
	switch (action.type) {
		case blockchainExplorerActionTypes.FETCH_LATEST_TRANSACTIONS_DATA_SUCCESS: {
			const { _embedded, _links } = action.payload.data;
			return { ...state, ...{ latestTransactions: _embedded.records, nextLinkTransaction: _links.next.href } };
		}
		case blockchainExplorerActionTypes.CHANGE_DATA_TYPE: {
			return { ...state, type: action.payload };
		}
		case blockchainExplorerActionTypes.FETCH_LATEST_LEDGERS_DATA_SUCCESS: {
			const { _embedded, _links } = action.payload.data;
			return { ...state, ...{ latestLedgers: _embedded.records, nextLinkLegers: _links.next.href } };
		}
		case blockchainExplorerActionTypes.FETCH_PAGE_INFO_SUCCESS: {
			return { ...state, prodactPage: action.payload.data };
		}
		case blockchainExplorerActionTypes.RESET_INFO_PAGE: {
			return { ...state, prodactPage: {}, legersTransactions: {}, pageOperations: {} };
		}
		case blockchainExplorerActionTypes.FETCH_PAGE_OPERATION_SUCCESS: {
			return { ...state, pageOperations: action.payload.data };
		}
		case blockchainExplorerActionTypes.FETCH_LEGERS_TRANSACTIONS_DATA_SUCCESS: {
			return { ...state, legersTransactions: action.payload.data };
		}
		case blockchainExplorerActionTypes.FETCH_ACCOUNT_DATA_SUCCESS: {
			return { ...state, accountPage: action.payload.data };
		}
		case blockchainExplorerActionTypes.RESET_ACCOUNT_PAGE: {
			return { ...state, accountPage: {}, accountRecentActivity: {}, legersTransactions: {} };
		}
		case blockchainExplorerActionTypes.FETCH_ACCOUNT_TRANSACTIONS_SUCCESS: {
			return { ...state, accountRecentActivity: action.payload.data };
		}
		case blockchainExplorerActionTypes.FETCH_MORE_INFO_SUCCESS: {
			const { type, data } = action.payload;
			if (type === 'Transactions') {
				const latestTransactions = [...state.latestTransactions, ...data._embedded.records];
				return { ...state, ...{ latestTransactions, nextLinkTransaction: data._links.next.href } };
			} else {
				const latestLedgers = [...state.latestLedgers, ...data._embedded.records];
				return { ...state, ...{ latestLedgers, nextLinkLegers: data._links.next.href } };
			}
		}
		default: {
			return state;
		}
	}
}
