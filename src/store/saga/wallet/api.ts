import { takeEvery, call, put, all } from 'redux-saga/effects';
import types from '../../actions/site/types';
import * as Kin from 'kin-wallet';
import { setTemplateErrors } from '../../actions/errors/actionsErrors';

const bc = new Kin.Blockchain(true);

/////////////
// Ledger
////////////

function* isLedgerConnected(action) {
	try {
		// prevent previouse connected ledger
		yield put({
			type: types.SET_IS_LEDGER_CONNECTED,
			payload: { ledgerConnected: false }
		});
		// check if ledger connected
		yield Kin.Ledger.getPublicKey("44'/2017'/0'");

		// set connected
		yield put({
			type: types.SET_IS_LEDGER_CONNECTED,
			payload: { ledgerConnected: true }
		});
	} catch ({ error }) {
		// set error
		yield put(setTemplateErrors([error]));
	}
}

function* getPublicKey(action) {
	try {
		const data = yield Kin.Ledger.getPublicKey(action.payload);
		console.log(data);
		yield put({
			type: types.SET_PUBLIC_KEY,
			payload: { publicKey: data.publicKey() }
		});
	} catch ({ error }) {
		yield put(setTemplateErrors([error]));
	}
}

function* getAccount(action) {
	try {
		// payload is public key
		const data = yield bc.getAccount(action.payload);
		yield put({
			type: types.SET_PUBLIC_KEY,
			payload: { account: data }
		});
	} catch (error) {
		console.log(error);
		yield put(setTemplateErrors(['No account have been found with this public key']));
	}
}

function* getUnsignedTransaction(action) {
	try {
		// payload is public key
		const data = yield bc.getUnsignedTransaction(...action.payload);
		yield put({
			type: types.SET_UNSIGNED_TRANSACTION,
			payload: { unsignedTransaction: data }
		});
	} catch (error) {
		yield put(setTemplateErrors([error.toString()]));
	}
}

function* signTransaction(action) {
	try {
		const data = yield Kin.Ledger.signTransaction(...action.payload);
		const confirm = yield bc.submitTransaction(data);
		yield put({
			type: types.SIGN_TRANSACTION,
			payload: confirm
		});
	} catch (error) {
		yield put(setTemplateErrors([error.toString()]));
	}
}

///////////////
// Key Pair
//////////////

function* isKeyPairValid(action) {
	try {
		// prevent previouse keyPair
		yield put({
			type: types.SET_IS_KEYPAIR_VALID,
			payload: { keyPairValid: false }
		});

		// get keyPair
		const data = yield Kin.KeyPair.fromSecret(action.payload);
		// set valid
		yield put({
			type: types.SET_IS_KEYPAIR_VALID,
			payload: { keyPairValid: true, secret: action.payload }
		});
		// set public key
		yield put({
			type: types.SET_PUBLIC_KEY,
			payload: { publicKey: data.publicKey() }
		});
	} catch (error) {
		// set error
		yield put(setTemplateErrors([error.toString()]));
	}
}
function* signTransactionKeyPair(action) {
	try {
		const data = yield Kin.KeyPair.signTransaction(...action.payload);
		const confirm = yield bc.submitTransaction(data);
		yield put({
			type: types.SIGN_TRANSACTION_KEYPAIR,
			payload: confirm
		});
	} catch (error) {
		yield put(setTemplateErrors([error.toString()]));
	}
}

// watcher
function* blockchainSaga() {
	yield takeEvery(types.IS_LEDGER_CONNECTED, isLedgerConnected);
	yield takeEvery(types.GET_PUBLIC_KEY, getPublicKey);
	yield takeEvery(types.GET_ACCOUNT, getAccount);
	yield takeEvery(types.GET_UNSIGNED_TRANSACTION, getUnsignedTransaction);
	yield takeEvery(types.SET_SIGN_TRANSACTION, signTransaction);
	yield takeEvery(types.GET_IS_KEYPAIR_VALID, isKeyPairValid);
	yield takeEvery(types.SET_SIGN_TRANSACTION_KEYPAIR, signTransactionKeyPair);
}

export default blockchainSaga;
