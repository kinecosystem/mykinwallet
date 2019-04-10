import { blockchainExplorerActionTypes } from '../../actionConsts/site/blockchainExplorer';

export const getTransactionsData = (shouldLimit, dataType) => {
	return {
		type: blockchainExplorerActionTypes.FETCH_LATEST_TRANSACTIONS_DATA,
		payload: { shouldLimit, dataType }
	};
};

export const getLesgersData = (shouldLimit, dataType) => {
	return {
		type: blockchainExplorerActionTypes.FETCH_LATEST_LEDGERS_DATA,
		payload: { shouldLimit, dataType }
	};
};

export const getBlookchainPageInfo = (url, type) => {
	return {
		type: blockchainExplorerActionTypes.FETCH_PAGE_INFO,
		payload: { url, type }
	};
};

export const getLegersTransactions = (id, dataType) => {
	return {
		type: blockchainExplorerActionTypes.FETCH_LEGERS_TRANSACTIONS_DATA,
		payload: { id, dataType }
	};
};

export const resetPageData = () => {
	return {
		type: blockchainExplorerActionTypes.RESET_INFO_PAGE
	};
};

export const getOprationInfo = (url, dataType) => {
	return {
		type: blockchainExplorerActionTypes.FETCH_PAGE_OPERATION,
		payload: { url, dataType }
	};
};

export const fetchAccountData = (id, dataType) => {
	return {
		type: blockchainExplorerActionTypes.FETCH_ACCOUNT_DATA,
		payload: { id, dataType }
	};
};

export const resetAccountPageData = () => {
	return {
		type: blockchainExplorerActionTypes.RESET_ACCOUNT_PAGE
	};
};

export const fetchAccountTransactions = (id, dataType) => {
	return {
		type: blockchainExplorerActionTypes.FETCH_ACCOUNT_TRANSACTIONS,
		payload: { id, dataType }
	};
};

export const searchForPage = (text, dataType) => {
	return {
		type: blockchainExplorerActionTypes.SEARCH_FOR_PAGE,
		payload: { text, dataType }
	};
};

export const getMoreInfo = (url, type) => {
	return {
		type: blockchainExplorerActionTypes.FETCH_MORE_INFO,
		payload: { url, type }
	};
};

export const changeDataType = type => {
	return {
		type: blockchainExplorerActionTypes.CHANGE_DATA_TYPE,
		payload: type
	};
};
