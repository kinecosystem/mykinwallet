import { takeLatest, put } from 'redux-saga/effects';
import types from '../../actions/site/types';
import * as Kin from 'kin-wallet';
import { setTemplateErrors } from '../../actions/errors/actionsErrors';
import commonpb from '@kinecosystem/agora-api/node/common/v4/model_pb';
import accountpb from '@kinecosystem/agora-api/node/account/v4/account_service_pb';
import transactionpb from '@kinecosystem/agora-api/node/transaction/v4/transaction_service_pb';
import { Keypair } from '@kinecosystem/kin-sdk';
import bs58 from 'bs58';
import axios, { AxiosResponse } from 'axios';
import { PublicKey } from '../../../models/keys';
import { quarksToKin } from '../../../models/utils';

// to make test net pass true
const bc = new Kin.Blockchain(true);

const agoraURL = 'http://localhost:8085';
const agoraHeaders = {
	'Content-Type': 'application/proto'
};
const resolveTokenAccountsURL = agoraURL + '/api/kin.agora.account.v4.Account/ResolveTokenAccounts';
const getAccountInfoURL = agoraURL + '/api/kin.agora.account.v4.Account/GetAccountInfo';
const getRecentBlockhashURL = agoraURL + '/api/kin.agora.transaction.v4.Transaction/GetRecentBlockhash';

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

		yield loading(false);
	} catch (error) {
		yield loading(false);
		// set error
		yield put(setTemplateErrors([error]));
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
	} catch (error) {
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
			type: types.SET_ACCOUNT,
			payload: { account: data }
		});
		// trigger load
		yield loading(false);
	} catch (error) {
		yield loading(false);
		if (error.response) {
			yield put(setTemplateErrors([error.response.title]));
		} else {
			yield put(setTemplateErrors([error.message]));
		}
	}
}

function* getUnsignedTransaction(action) {
	const [publicKey, destinationAccount, kinAmount, memo] = action.payload;
	try {
		yield loading(true);
		const account = yield bc.getAccount(publicKey);
		// payload is public key
		const data = yield bc.getUnsignedTransaction(account, destinationAccount, kinAmount, memo);
		yield put({
			type: types.SET_UNSIGNED_TRANSACTION,
			payload: { unsignedTransaction: data }
		});
		yield loading(false);
	} catch (error) {
		yield loading(false);

		yield put(setTemplateErrors([error.toString()]));
	}
}

function* signTransaction(action) {
	const { derviationPath, unsignedTransaction, signedTransaction, tx } = action.payload;
	let data;
	try {
		if (!signedTransaction) {
			data = yield Kin.Ledger.signTransaction(derviationPath, unsignedTransaction);
			yield loading(true);
			yield put({
				type: types.SIGN_TRANSACTION,
				payload: data
			});
		} else {
			const account = yield bc.getAccount(tx.publicKey);
			const newUnsignedTransaction = yield bc.getUnsignedTransaction(account, ...tx.formData);
			data = yield Kin.Ledger.signTransaction(derviationPath, newUnsignedTransaction);
			yield loading(true);
			yield put({
				type: types.SIGN_TRANSACTION,
				payload: data
			});
		}

		const confirm = yield bc.submitTransaction(data);
		yield put({
			type: types.SUBMIT_TRANSACTION,
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
		// // prevent previouse keyPair
		yield put({
			type: types.SET_IS_KEYPAIR_VALID,
			payload: { keyPairValid: false }
		});
		yield loading(true);
		// get keyPair
		const data = yield Kin.KeyPair.fromSecret(action.payload.trim());
		// set valid and set public key
		yield put({
			type: types.SET_IS_KEYPAIR_VALID,
			payload: { keyPairValid: true, secret: action.payload, publicKey: data.publicKey() }
		});
		yield loading(false);
	} catch (error) {
		try {
			const decoded = bs58.decode(action.payload.trim());
			const kp = Keypair.fromRawEd25519Seed(decoded);
			// set valid and set public key
			yield put({
				type: types.SET_IS_KEYPAIR_VALID,
				payload: { keyPairValid: true, secret: action.payload, publicKey: kp.publicKey() }
			});
			yield loading(false);
		} catch (error) {
			// set error
			yield loading(false);
			yield put(setTemplateErrors([error.toString()]));
		}
	}
}
function* signTransactionKeyPair(action) {
	const { unsignedTransaction, secret, signedTransaction } = action.payload;
	try {
		yield loading(true);
		let data;
		if (!signedTransaction) {
			data = yield Kin.KeyPair.signTransaction(secret, unsignedTransaction);
			yield put({
				type: types.SIGN_TRANSACTION,
				payload: data
			});
		} else data = signedTransaction;
		yield put({
			type: types.SIGN_TRANSACTION_KEYPAIR,
			payload: data
		});
		const confirm = yield bc.submitTransaction(data);
		yield put({
			type: types.SUBMIT_TRANSACTION,
			payload: confirm
		});
		yield loading(false);
	} catch (error) {
		yield loading(false);

		yield put(setTemplateErrors([error.toString()]));
	}
}

///////////////
// Agora
//////////////

// resolveTokenAccounts expects the payload to be a base58-encoded public key of a token account.
function* resolveTokenAccounts(action) {
	try {
		// trigger load
		yield loading(true);

		const accountID = new commonpb.SolanaAccountId();
		accountID.setValue(PublicKey.fromBase58(action.payload.trim()).buffer);
		const req = new accountpb.ResolveTokenAccountsRequest();
		req.setAccountId(accountID);

		const httpResp = yield submitAgoraReq(resolveTokenAccountsURL, req.serializeBinary());
		const resp = accountpb.ResolveTokenAccountsResponse.deserializeBinary(httpResp.data);
		console.log(resp);

		if (resp.getTokenAccountsList().length == 0) {
			yield put(setTemplateErrors([`No Kin token accounts found for ${action.payload.trim()}`]));
		} else {
			const accounts = [];
			for (var i = 0; i < resp.getTokenAccountsList().length; i++) {
				const tokenAccount = resp.getTokenAccountsList()[i];
				const req = new accountpb.GetAccountInfoRequest();
				req.setAccountId(tokenAccount);
				req.setCommitment(commonpb.Commitment.SINGLE);

				const httpResp = yield submitAgoraReq(getAccountInfoURL, req.serializeBinary());
				const accountResp = accountpb.GetAccountInfoResponse.deserializeBinary(httpResp.data);

				accounts.push({
					accountID: new PublicKey(Buffer.from(tokenAccount.getValue_asU8())).toBase58(),
					kinBalance: quarksToKin(accountResp.getAccountInfo().getBalance())
				});
			}

			yield put({
				type: types.SET_TOKEN_ACCOUNTS,
				payload: {
					tokenAccounts: accounts
				}
			});
			// trigger load
			yield loading(false);
		}
	} catch (error) {
		yield loading(false);
		if (error.response) {
			yield put(setTemplateErrors([error.response.title]));
		} else {
			yield put(setTemplateErrors([error.message]));
		}
	}
}

// getAccountInfo expects the payload to be a base58-encoded public key of a token account.
function* getAccountInfo(action) {
	try {
		const accountID = action.payload.trim();

		// trigger load
		yield loading(true);

		const solAccountID = new commonpb.SolanaAccountId();
		solAccountID.setValue(PublicKey.fromBase58(accountID).buffer);
		const req = new accountpb.GetAccountInfoRequest();
		req.setAccountId(solAccountID);
		req.setCommitment(commonpb.Commitment.SINGLE);

		const httpResp = yield submitAgoraReq(getAccountInfoURL, req.serializeBinary());
		const resp = accountpb.GetAccountInfoResponse.deserializeBinary(httpResp.data);

		if (resp.getResult() == accountpb.GetAccountInfoResponse.Result.OK) {
			yield put({
				type: types.SET_ACCOUNT_INFO,
				payload: {
					accountID: resp.getAccountInfo().getBalance()
				}
			});
			// trigger load
			yield loading(false);
		} else {
			yield put(setTemplateErrors([`Token account ${accountID} not found`]));
		}
	} catch (error) {
		yield loading(false);
		if (error.response) {
			yield put(setTemplateErrors([error.response.title]));
		} else {
			yield put(setTemplateErrors([error.message]));
		}
	}
}

function* getRecentBlockhash() {
	try {
		yield loading(true);

		// TODO: submit to agora instead
		const req = new transactionpb.GetRecentBlockhashRequest();
		const httpResp = yield submitAgoraReq(getRecentBlockhashURL, req.serializeBinary());
		const resp = transactionpb.GetRecentBlockhashResponse.deserializeBinary(httpResp.data);

		yield put({
			type: types.SET_RECENT_BLOCKHASH,
			payload: { recentBlockhash: resp.getBlockhash().getValue() }
		});

		// trigger load
		yield loading(false);
	} catch (error) {
		console.log(error);
		yield loading(false);
		yield put(setTemplateErrors([error.toString()]));
	}
}

function submitAgoraReq(url: string, data: Uint8Array): Promise<AxiosResponse> {
	return axios.request({
		method: 'post',
		url: url,
		data: data,
		headers: agoraHeaders,
		responseType: 'arraybuffer'
	});
}

// watcher
function* blockchainSaga() {
	yield takeLatest(types.IS_LEDGER_CONNECTED, isLedgerConnected);
	yield takeLatest(types.GET_PUBLIC_KEY, getPublicKey);
	yield takeLatest(types.GET_ACCOUNT, getAccount);
	yield takeLatest(types.GET_UNSIGNED_TRANSACTION, getUnsignedTransaction);
	yield takeLatest(types.SET_SIGN_TRANSACTION, signTransaction);
	yield takeLatest(types.GET_IS_KEYPAIR_VALID, isKeyPairValid);
	yield takeLatest(types.SET_SIGN_TRANSACTION_KEYPAIR, signTransactionKeyPair);
	yield takeLatest(types.RESOLVE_TOKEN_ACCOUNTS, resolveTokenAccounts);
	yield takeLatest(types.GET_ACCOUNT_INFO, getAccountInfo);
	yield takeLatest(types.GET_RECENT_BLOCKHASH, getRecentBlockhash);
}

export default blockchainSaga;
