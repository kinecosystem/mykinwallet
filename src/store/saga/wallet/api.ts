import { takeEvery, call, put, all } from 'redux-saga/effects';
import types from '../../actions/site/types';
import * as Kin from 'kin-wallet';
import { setTemplateErrors } from '../../actions/errors/actionsErrors';

const bc = new Kin.Blockchain(true);

function* loading(bool) {
	yield put({
		type: types.SET_LOADER,
		payload: bool
	});
}

/////////////
// Ledger
////////////

function* isLedgerConnected(action) {
	try {
		yield loading(true);
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
	} catch (error) {
		// set error
		yield put(setTemplateErrors([error]));
		yield loading(false);
	}
}

function* getPublicKey(action) {
	try {
		// trigger load
		yield loading(true);
		const data = yield Kin.Ledger.getPublicKey(action.payload.trim());
		yield put({
			type: types.SET_PUBLIC_KEY,
			payload: { publicKey: data.publicKey() }
		});
		// trigger end load
		yield loading(false);
	} catch ({ error }) {
		yield loading(false);
		yield put(setTemplateErrors([error]));
	}
}

function* getAccount(action) {
	try {
		// trigger load
		yield loading(true);
		// payload is public key
		const data = yield bc.getAccount(action.payload);
		yield put({
			type: types.SET_PUBLIC_KEY,
			payload: { account: data }
		});
		// trigger load
		yield loading(false);
	} catch (error) {
		yield loading(false);
		console.log(error);
		yield put(setTemplateErrors(["Your account information couldn't be retrieved due to network issues"]));
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
		// trigger load
		yield loading(true);
		const data = yield Kin.Ledger.signTransaction(...action.payload);
		const confirm = yield bc.submitTransaction(data);
		yield put({
			type: types.SIGN_TRANSACTION,
			payload: confirm
		});
		// trigger load
		yield loading(false);
	} catch (error) {
		yield loading(false);
		console.log(error);
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
		yield loading(true);

		// get keyPair
		const data = yield Kin.KeyPair.fromSecret(action.payload.trim());
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
		yield loading(false);
	} catch (error) {
		// set error
		yield loading(false);
		yield put(setTemplateErrors([error.toString()]));
	}
}
function* signTransactionKeyPair(action) {
	try {
		yield loading(true);

		const data = yield Kin.KeyPair.signTransaction(...action.payload);
		const confirm = yield bc.submitTransaction(data);
		yield put({
			type: types.SIGN_TRANSACTION_KEYPAIR,
			payload: confirm
		});
		yield loading(false);
	} catch (error) {
		yield loading(false);

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
