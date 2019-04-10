import { takeEvery, call, put, all } from 'redux-saga/effects';
import { blockchainExplorerActionTypes } from '../../actionConsts/site/blockchainExplorer';
import {
	fetchBlockchainLatestTransactions,
	fetchBlockchainLatestLedgers,
	fetchBlockchainPageInfo,
	fetchBlockchainOperationInfo,
	fetchBlockchainAccountInfo,
	fetchBlockchainAccountTransactions,
	fetchBlockchainLegersTransactions,
	fetchBlockchainMorePageInfo
} from '../../../utils/site/apiRoutes';
import { navigate } from 'gatsby';

function* fetchLatestTransactions(action) {
	try {
		const data = yield call(() => fetchBlockchainLatestTransactions(action.payload.shouldLimit, action.payload.dataType));
		yield put({
			type: blockchainExplorerActionTypes.FETCH_LATEST_TRANSACTIONS_DATA_SUCCESS,
			payload: data
		});
	} catch (e) {
		console.log(e);
	}
}

function* fetchLatestLedgers(action) {
	try {
		const data = yield call(() => fetchBlockchainLatestLedgers(action.payload.shouldLimit, action.payload.dataType));
		yield put({
			type: blockchainExplorerActionTypes.FETCH_LATEST_LEDGERS_DATA_SUCCESS,
			payload: data
		});
	} catch (e) {
		console.log(e);
	}
}

function* fetchPageInfo(action) {
	try {
		const data = yield call(() => fetchBlockchainPageInfo(action.payload.url, action.payload.type));
		yield put({
			type: blockchainExplorerActionTypes.FETCH_PAGE_INFO_SUCCESS,
			payload: data
		});
	} catch (e) {
		console.log(e);
	}
}

function* fetchLegersTransactions(action) {
	try {
		const data = yield call(() => fetchBlockchainLegersTransactions(action.payload.id, action.payload.dataType));
		yield put({
			type: blockchainExplorerActionTypes.FETCH_LEGERS_TRANSACTIONS_DATA_SUCCESS,
			payload: data
		});
	} catch (e) {
		console.log(e);
	}
}

function* fetchPageOperation(action) {
	try {
		const data = yield call(() => fetchBlockchainOperationInfo(action.payload.url, action.payload.dataType));
		yield put({
			type: blockchainExplorerActionTypes.FETCH_PAGE_OPERATION_SUCCESS,
			payload: data
		});
	} catch (e) {
		console.log(e);
	}
}

function* fetchAccountInfo(action) {
	const data = yield call(() => fetchBlockchainAccountInfo(action.payload.id, action.payload.dataType));
	try {
		yield put({
			type: blockchainExplorerActionTypes.FETCH_ACCOUNT_DATA_SUCCESS,
			payload: data
		});
	} catch (e) {
		console.log(e);
	}
}

function* fetchAccountTransactions(action) {
	const data = yield call(() => fetchBlockchainAccountTransactions(action.payload.id, action.payload.dataType));
	try {
		yield put({
			type: blockchainExplorerActionTypes.FETCH_ACCOUNT_TRANSACTIONS_SUCCESS,
			payload: data
		});
	} catch (e) {
		console.log(e);
	}
}

function* searchForPage(action) {
	try {
		let type;
		const { text, dataType } = action.payload;
		if (/^\d+$/.test(text)) {
			type = 0;
			yield call(() => fetchBlockchainPageInfo(`ledgers/${text}`, dataType));
		} else if (text[0].toUpperCase() === 'G') {
			type = 1;
			yield call(() => fetchBlockchainAccountInfo(text, dataType));
		} else {
			type = 2;
			yield call(() => fetchBlockchainPageInfo(`transactions/${text}`, dataType));
		}
		const navigations = [
			() => navigate('/blockchainInfoPage', { state: { id: text, header: 'Ledgers', dataType } }),
			() => navigate('/blockchainAccount', { state: { id: text, dataType } }),
			() => navigate('/blockchainInfoPage', { state: { id: text, header: 'Transaction', dataType } })
		];
		const navigationFunction = navigations[type];
		navigationFunction();
	} catch (e) {
		console.log(e);
		navigate('/blockchainErrorPage', { state: { error: 'No Transction Ledger or account with this ID was found' } });
	}
}

function* fetchMorePageInfo(action) {
	const data = yield call(() => fetchBlockchainMorePageInfo(action.payload.url));
	try {
		yield put({
			type: blockchainExplorerActionTypes.FETCH_MORE_INFO_SUCCESS,
			payload: { data: data.data, type: action.payload.type }
		});
	} catch (e) {
		console.log(e);
	}
}

function* blockchainSaga() {
	yield takeEvery(blockchainExplorerActionTypes.FETCH_LATEST_TRANSACTIONS_DATA, fetchLatestTransactions);
	yield takeEvery(blockchainExplorerActionTypes.FETCH_LATEST_LEDGERS_DATA, fetchLatestLedgers);
	yield takeEvery(blockchainExplorerActionTypes.FETCH_PAGE_INFO, fetchPageInfo);
	yield takeEvery(blockchainExplorerActionTypes.FETCH_LEGERS_TRANSACTIONS_DATA, fetchLegersTransactions);
	yield takeEvery(blockchainExplorerActionTypes.FETCH_PAGE_OPERATION, fetchPageOperation);
	yield takeEvery(blockchainExplorerActionTypes.FETCH_ACCOUNT_DATA, fetchAccountInfo);
	yield takeEvery(blockchainExplorerActionTypes.FETCH_ACCOUNT_TRANSACTIONS, fetchAccountTransactions);
	yield takeEvery(blockchainExplorerActionTypes.SEARCH_FOR_PAGE, searchForPage);
	yield takeEvery(blockchainExplorerActionTypes.FETCH_MORE_INFO, fetchMorePageInfo);
}

export default blockchainSaga;
