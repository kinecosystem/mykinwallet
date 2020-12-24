import { takeLatest, put } from 'redux-saga/effects';
import types from '../../actions/site/types';
import * as Kin from 'kin-wallet';
import { resetTemplateErrors, setTemplateErrors } from '../../actions/errors/actionsErrors';
import commonpb from '@kinecosystem/agora-api/node/common/v4/model_pb';
import accountpb from '@kinecosystem/agora-api/node/account/v4/account_service_pb';
import transactionpb from '@kinecosystem/agora-api/node/transaction/v4/transaction_service_pb';
import { Keypair } from '@kinecosystem/kin-sdk';
import bs58 from 'bs58';
import axios, { AxiosResponse } from 'axios';
import { PrivateKey, PublicKey } from '../../../models/keys';
import { kinToQuarks, quarksToKin } from '../../../models/utils';
import { AccountSize, AuthorityType, TokenProgram } from '../../../solana/token-program';
import { MemoProgram } from '../../../solana/memo-program';
import { Transaction, PublicKey as SolanaPublicKey, Account, SystemProgram } from '@solana/web3.js';
import { Kin4Ledger } from '../../../solana/kin-4-ledger';
import { AGORA_URL } from '../../../config';

// to make test net pass true
const bc = new Kin.Blockchain();
const kin4Ledger = new Kin4Ledger();

const createAccountURL = AGORA_URL + '/api/kin.agora.account.v4.Account/CreateAccount';
const resolveTokenAccountsURL = AGORA_URL + '/api/kin.agora.account.v4.Account/ResolveTokenAccounts';
const getAccountInfoURL = AGORA_URL + '/api/kin.agora.account.v4.Account/GetAccountInfo';

const getServiceConfigURL = AGORA_URL + '/api/kin.agora.transaction.v4.Transaction/GetServiceConfig';
const getRecentBlockhashURL = AGORA_URL + '/api/kin.agora.transaction.v4.Transaction/GetRecentBlockhash';
const getMinBalanceURL = AGORA_URL + '/api/kin.agora.transaction.v4.Transaction/GetMinimumBalanceForRentExemption';
const submitTransactionURL = AGORA_URL + '/api/kin.agora.transaction.v4.Transaction/SubmitTransaction';

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

		// reset any previously connected ledger
		yield put({
			type: types.SET_IS_LEDGER_CONNECTED,
			payload: { ledgerConnected: false }
		});

		// check if ledger connected
		yield kin4Ledger.getPublicKey(0);

		// set connected
		yield put({
			type: types.SET_IS_LEDGER_CONNECTED,
			payload: { ledgerConnected: true }
		});

		yield loading(false);
	} catch (error) {
		yield loading(false);
		if (error.message) {
			yield put(setTemplateErrors([error.message]));
		} else {
			yield put(setTemplateErrors([error]));
		}
	}
}

function* requestPublicKey(action) {
	try {
		yield loading(true);

		// Reset previously existing public key-related data
		yield put({
			type: types.RESET_PUBLIC_KEY_DATA
		});

		const key = yield kin4Ledger.getPublicKeyWithDisplay(getAccountFromPath(action.payload.trim()));
		const pk = PublicKey.fromBase58(key.toBase58());

		yield put({
			type: types.SET_PUBLIC_KEY,
			payload: { publicKey: pk.stellarAddress() }
		});
		yield put({
			type: types.SET_SOLANA_PUBLIC_KEY,
			payload: { publicKey: pk.toBase58() }
		});
		yield loading(false);
	} catch (error) {
		yield loading(false);
		if (error.message) {
			yield put(setTemplateErrors([error.message]));
		} else {
			yield put(setTemplateErrors([error]));
		}
	}
}

function* getPublicKey(action) {
	try {
		yield loading(true);

		// Reset previously existing public key-related data
		yield put({
			type: types.RESET_PUBLIC_KEY_DATA
		});

		const key = yield kin4Ledger.getPublicKey(getAccountFromPath(action.payload.trim()));
		const pk = PublicKey.fromBase58(key.toBase58());

		yield put({
			type: types.SET_PUBLIC_KEY,
			payload: { publicKey: pk.stellarAddress() }
		});
		yield put({
			type: types.SET_SOLANA_PUBLIC_KEY,
			payload: { publicKey: pk.toBase58() }
		});
		// trigger end load
		yield loading(false);
	} catch (error) {
		yield loading(false);
		if (error.message) {
			yield put(setTemplateErrors([error.message]));
		} else {
			yield put(setTemplateErrors([error]));
		}
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
// Solana
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

		if (resp.getTokenAccountsList().length == 0) {
			yield put({
				type: types.SET_TOKEN_ACCOUNTS,
				payload: {
					tokenAccounts: [],
					balances: {}
				}
			});
			yield put(setTemplateErrors([`No Kin token accounts found for ${action.payload.trim()}`]));
		} else {
			const accountIDs = [];
			const balances = {};
			for (var i = 0; i < resp.getTokenAccountsList().length; i++) {
				const tokenAccount = resp.getTokenAccountsList()[i];
				const req = new accountpb.GetAccountInfoRequest();
				req.setAccountId(tokenAccount);
				req.setCommitment(commonpb.Commitment.SINGLE);

				const httpResp = yield submitAgoraReq(getAccountInfoURL, req.serializeBinary());
				const accountResp = accountpb.GetAccountInfoResponse.deserializeBinary(httpResp.data);

				const accountID = new PublicKey(Buffer.from(tokenAccount.getValue_asU8())).toBase58();
				accountIDs.push(accountID);
				balances[accountID] = quarksToKin(accountResp.getAccountInfo().getBalance());
			}

			yield put({
				type: types.SET_TOKEN_ACCOUNTS,
				payload: {
					tokenAccounts: accountIDs,
					balances: balances
				}
			});
			yield put({
				type: types.SET_ACCOUNT_UPDATE_REQUIRED,
				payload: false
			});
		}
		yield loading(false);
	} catch (error) {
		yield loading(false);
		yield put(setTemplateErrors([`Failed to resolve token accounts (${error.toString()})`]));
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
		yield put(setTemplateErrors([`Failed to get account info (${error.toString()})`]));
		yield loading(false);
	}
}

function* getServiceConfig() {
	try {
		yield loading(true);
		// TODO: submit to agora instead
		const req = new transactionpb.GetServiceConfigRequest();
		const httpResp = yield submitAgoraReq(getServiceConfigURL, req.serializeBinary());
		const resp = transactionpb.GetServiceConfigResponse.deserializeBinary(httpResp.data);

		var subsidizer: Uint8Array | undefined;
		if (resp.getSubsidizerAccount()) {
			subsidizer = resp.getSubsidizerAccount().getValue_asU8();
		}

		yield put({
			type: types.SET_SERVICE_CONFIG,
			payload: {
				serviceConfig: {
					tokenProgram: resp.getTokenProgram().getValue_asU8(),
					token: resp.getToken().getValue_asU8(),
					subsidizer: subsidizer
				}
			}
		});
		// trigger load
		yield loading(false);
	} catch (error) {
		yield put(setTemplateErrors([error.toString()]));
		yield loading(false);
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
		yield put(setTemplateErrors([error.toString()]));
		yield loading(false);
	}
}

function* getSolanaTransaction(action) {
	const [publicKey, tokenAccount, destinationAccount, kinAmount, memo, tokenProgram, subsidizer] = action.payload;
	try {
		yield loading(true);

		const owner = PublicKey.fromString(publicKey).solanaKey();
		var feePayer: SolanaPublicKey;
		if (subsidizer) {
			feePayer = new SolanaPublicKey(subsidizer);
		} else {
			feePayer = owner;
		}

		const instructions = [];
		if (memo !== undefined && memo.length != 0) {
			instructions.push(MemoProgram.memo({ data: memo }));
		}

		instructions.push(
			TokenProgram.transfer(
				{
					source: PublicKey.fromBase58(tokenAccount).solanaKey(),
					dest: PublicKey.fromBase58(destinationAccount).solanaKey(),
					owner: PublicKey.fromString(publicKey).solanaKey(),
					amount: BigInt(kinToQuarks(kinAmount.toString()))
				},
				new SolanaPublicKey(tokenProgram)
			)
		);

		// TODO: might be from subsidizer?
		const tx = new Transaction({
			feePayer: feePayer
		}).add(...instructions);

		yield put({
			type: types.SET_SOLANA_TRANSACTION,
			payload: { transaction: tx }
		});
		yield loading(false);
	} catch (error) {
		yield put(setTemplateErrors([error.toString()]));
		yield loading(false);
	}
}

function* signAndSubmitTransaction(action) {
	const [transaction, secret] = action.payload;
	try {
		yield loading(true);

		// TODO: maybe only support base58 everywhere
		var pk: PrivateKey;
		try {
			pk = PrivateKey.fromString(secret);
		} catch (error) {
			pk = PrivateKey.fromBase58(secret);
		}

		const req = new transactionpb.GetRecentBlockhashRequest();
		const httpResp = yield submitAgoraReq(getRecentBlockhashURL, req.serializeBinary());
		const resp = transactionpb.GetRecentBlockhashResponse.deserializeBinary(httpResp.data);

		transaction.recentBlockhash = bs58.encode(Buffer.from(resp.getBlockhash()!.getValue_asU8()));
		transaction.partialSign(new Account(pk.secretKey()));

		const protoTx = new commonpb.Transaction();
		protoTx.setValue(
			transaction.serialize({
				requireAllSignatures: false,
				verifySignatures: false
			})
		);

		const submitReq = new transactionpb.SubmitTransactionRequest();
		submitReq.setTransaction(protoTx);
		submitReq.setCommitment(commonpb.Commitment.SINGLE);

		const submitHttpResp = yield submitAgoraReq(submitTransactionURL, submitReq.serializeBinary());
		const submitResp = transactionpb.SubmitTransactionResponse.deserializeBinary(submitHttpResp.data);

		switch (submitResp.getResult()) {
			case transactionpb.SubmitTransactionResponse.Result.OK:
			case transactionpb.SubmitTransactionResponse.Result.ALREADY_SUBMITTED:
				yield put({
					type: types.SET_SUBMITTED_TRANSACTION,
					payload: {
						submitResponse: submitResp,
						signature: submitResp.getSignature().getValue_asU8()
					}
				});
				break;
			case transactionpb.SubmitTransactionResponse.Result.FAILED:
				switch (submitResp.getTransactionError().getReason()) {
					case commonpb.TransactionError.Reason.UNAUTHORIZED:
						yield put(setTemplateErrors(['The transaction failed due to a signature error']));
						break;
					case commonpb.TransactionError.Reason.BAD_NONCE:
						yield put(setTemplateErrors(['The transaction failed because of a bad nonce. Please try again.']));
						break;
					case commonpb.TransactionError.Reason.INSUFFICIENT_FUNDS:
						yield put(setTemplateErrors(['The transaction failed because of insufficient funds.']));
						break;
					case commonpb.TransactionError.Reason.INVALID_ACCOUNT:
						yield put(
							setTemplateErrors(['The transaction failed because of an invalid account. Please check your account values'])
						);
						break;
					default:
						yield put(setTemplateErrors(['The transaction failed for an unknown reason']));
				}
				break;
			case transactionpb.SubmitTransactionResponse.Result.REJECTED:
				yield put(setTemplateErrors(['The transaction was rejected by the configured webhook']));
				break;
			case transactionpb.SubmitTransactionResponse.Result.INVOICE_ERROR:
				yield put(setTemplateErrors(['The transaction was rejected by the configured webhook because of an invoice error.']));
				break;
			case transactionpb.SubmitTransactionResponse.Result.PAYER_REQUIRED:
				yield put(setTemplateErrors(['The transaction failed because the transaction subsidizer did not sign the transaction.']));
				break;
		}
		yield loading(false);
	} catch (error) {
		yield put(setTemplateErrors([`Failed to sign and submit transaction (${error.toString()})`]));
		yield loading(false);
	}
}

function* signAndSubmitTransactionWithLedger(action) {
	const [derivationPath, transaction] = action.payload;
	var signedTransaction;
	try {
		yield loading(true);
		const pathAccount = getAccountFromPath(derivationPath);

		const req = new transactionpb.GetRecentBlockhashRequest();
		const httpResp = yield submitAgoraReq(getRecentBlockhashURL, req.serializeBinary());
		const resp = transactionpb.GetRecentBlockhashResponse.deserializeBinary(httpResp.data);

		transaction.recentBlockhash = bs58.encode(Buffer.from(resp.getBlockhash()!.getValue_asU8()));

		signedTransaction = yield kin4Ledger.signTransaction(pathAccount, transaction);

		const protoTx = new commonpb.Transaction();
		protoTx.setValue(
			signedTransaction.serialize({
				requireAllSignatures: false,
				verifySignatures: false
			})
		);

		const submitReq = new transactionpb.SubmitTransactionRequest();
		submitReq.setTransaction(protoTx);
		submitReq.setCommitment(commonpb.Commitment.SINGLE);

		const submitHttpResp = yield submitAgoraReq(submitTransactionURL, submitReq.serializeBinary());
		const submitResp = transactionpb.SubmitTransactionResponse.deserializeBinary(submitHttpResp.data);

		switch (submitResp.getResult()) {
			case transactionpb.SubmitTransactionResponse.Result.OK:
			case transactionpb.SubmitTransactionResponse.Result.ALREADY_SUBMITTED:
				yield put({
					type: types.SET_SUBMITTED_TRANSACTION,
					payload: {
						submitResponse: submitResp,
						signature: submitResp.getSignature().getValue_asU8()
					}
				});
				break;
			case transactionpb.SubmitTransactionResponse.Result.FAILED:
				switch (submitResp.getTransactionError().getReason()) {
					case commonpb.TransactionError.Reason.UNAUTHORIZED:
						yield put(setTemplateErrors(['The transaction failed due to a signature error']));
						break;
					case commonpb.TransactionError.Reason.BAD_NONCE:
						yield put(setTemplateErrors(['The transaction failed because of a bad nonce. Please try again.']));
						break;
					case commonpb.TransactionError.Reason.INSUFFICIENT_FUNDS:
						yield put(setTemplateErrors(['The transaction failed because of insufficient funds.']));
						break;
					case commonpb.TransactionError.Reason.INVALID_ACCOUNT:
						yield put(
							setTemplateErrors(['The transaction failed because of an invalid account. Please check your account values'])
						);
						break;
					default:
						yield put(setTemplateErrors(['The transaction failed for an unknown reason']));
				}
				break;
			case transactionpb.SubmitTransactionResponse.Result.REJECTED:
				yield put(setTemplateErrors(['The transaction was rejected by the configured webhook']));
				break;
			case transactionpb.SubmitTransactionResponse.Result.INVOICE_ERROR:
				yield put(setTemplateErrors(['The transaction was rejected by the configured webhook because of an invoice error.']));
				break;
			case transactionpb.SubmitTransactionResponse.Result.PAYER_REQUIRED:
				yield put(setTemplateErrors(['The transaction failed because the transaction subsidizer did not sign the transaction.']));
				break;
		}
		yield loading(false);
	} catch (error) {
		yield put(setTemplateErrors([`Failed to sign and submit transaction (${error.toString()})`]));
		yield loading(false);
	}
}

function* createTokenAccount(action) {
	const [secret, tokenProgram, token, subsidizer] = action.payload;
	try {
		yield loading(true);
		const tokenProgramKey = new SolanaPublicKey(tokenProgram);
		const tokenKey = new SolanaPublicKey(token);

		// TODO: maybe only support base58 everywhere
		var owner: PrivateKey;
		try {
			owner = PrivateKey.fromString(secret);
		} catch (error) {
			owner = PrivateKey.fromBase58(secret);
		}

		var subsidizerKey: SolanaPublicKey;
		if (subsidizer) {
			subsidizerKey = new SolanaPublicKey(subsidizer);
		} else {
			subsidizerKey = owner.publicKey().solanaKey();
		}

		const req = new transactionpb.GetRecentBlockhashRequest();
		const httpResp = yield submitAgoraReq(getRecentBlockhashURL, req.serializeBinary());
		const resp = transactionpb.GetRecentBlockhashResponse.deserializeBinary(httpResp.data);

		const recentBlockhash = bs58.encode(Buffer.from(resp.getBlockhash()!.getValue_asU8()));

		const minBalanceReq = new transactionpb.GetMinimumBalanceForRentExemptionRequest();
		minBalanceReq.setSize(AccountSize);
		const minBalanceHttpResp = yield submitAgoraReq(getMinBalanceURL, minBalanceReq.serializeBinary());
		const minBalanceResp = transactionpb.GetMinimumBalanceForRentExemptionResponse.deserializeBinary(minBalanceHttpResp.data);

		const tx = getCreateAccountTx(
			recentBlockhash,
			owner.publicKey().solanaKey(),
			owner.publicKey().solanaKey(),
			subsidizerKey,
			tokenProgramKey,
			tokenKey,
			minBalanceResp.getLamports()
		);
		tx.partialSign(new Account(owner.secretKey()));

		const protoTx = new commonpb.Transaction();
		protoTx.setValue(
			tx.serialize({
				requireAllSignatures: false,
				verifySignatures: false
			})
		);

		const createReq = new accountpb.CreateAccountRequest();
		createReq.setTransaction(protoTx);
		createReq.setCommitment(commonpb.Commitment.SINGLE);

		const createHttpResp = yield submitAgoraReq(createAccountURL, createReq.serializeBinary());
		const createResp = accountpb.CreateAccountResponse.deserializeBinary(createHttpResp.data);

		switch (createResp.getResult()) {
			case accountpb.CreateAccountResponse.Result.OK:
				// TODO: one day maybe add notifications instead of using errors for displaying tx ids
				yield put(
					setTemplateErrors([
						`Submitted transaction to create token account ${bs58.encode(
							createResp
								.getAccountInfo()
								.getAccountId()
								.getValue_asU8()
						)} with single commitment.`
					])
				);
				yield put({
					type: types.SET_ACCOUNT_UPDATE_REQUIRED,
					payload: true
				});
				break;
			case accountpb.CreateAccountResponse.Result.EXISTS:
				yield put({
					type: types.SET_ACCOUNT_UPDATE_REQUIRED,
					payload: true
				});
				yield put(setTemplateErrors(['An account with the randomly generated address exists. Please try again.']));
				break;
			case accountpb.CreateAccountResponse.Result.PAYER_REQUIRED:
				yield put(
					setTemplateErrors([
						'The transaction to create a token account failed because the transaction subsidizer did not sign the transaction.'
					])
				);
				break;
			case accountpb.CreateAccountResponse.Result.BAD_NONCE:
				yield put(
					setTemplateErrors(['The transaction to create a token account failed because of a bad nonce. Please try again.'])
				);
				break;
			default:
				yield put(setTemplateErrors(['Something went wrong. Please reload']));
				break;
		}
		yield loading(false);
	} catch (error) {
		yield put(setTemplateErrors([`Create token account request failed (${error.toString()})`]));
		yield loading(false);
	}
}

function* createTokenAccountWithLedger(action) {
	const [derivationPath, tokenProgram, token, subsidizer] = action.payload;
	try {
		yield loading(true);
		const pathAccount = getAccountFromPath(derivationPath);

		const tokenProgramKey = new SolanaPublicKey(tokenProgram);
		const tokenKey = new SolanaPublicKey(token);
		const owner = yield kin4Ledger.getPublicKey(pathAccount);

		var subsidizerKey: SolanaPublicKey;
		if (subsidizer) {
			subsidizerKey = new SolanaPublicKey(subsidizer);
		} else {
			subsidizerKey = owner;
		}

		const req = new transactionpb.GetRecentBlockhashRequest();
		const httpResp = yield submitAgoraReq(getRecentBlockhashURL, req.serializeBinary());
		const resp = transactionpb.GetRecentBlockhashResponse.deserializeBinary(httpResp.data);

		const recentBlockhash = bs58.encode(Buffer.from(resp.getBlockhash()!.getValue_asU8()));

		const minBalanceReq = new transactionpb.GetMinimumBalanceForRentExemptionRequest();
		minBalanceReq.setSize(165);
		const minBalanceHttpResp = yield submitAgoraReq(getMinBalanceURL, minBalanceReq.serializeBinary());
		const minBalanceResp = transactionpb.GetMinimumBalanceForRentExemptionResponse.deserializeBinary(minBalanceHttpResp.data);

		const tx = getCreateAccountTx(
			recentBlockhash,
			owner,
			owner,
			subsidizerKey,
			tokenProgramKey,
			tokenKey,
			minBalanceResp.getLamports()
		);

		const signedTransaction = yield kin4Ledger.signTransaction(pathAccount, tx);

		const protoTx = new commonpb.Transaction();
		protoTx.setValue(
			signedTransaction.serialize({
				requireAllSignatures: false,
				verifySignatures: false
			})
		);

		const createReq = new accountpb.CreateAccountRequest();
		createReq.setTransaction(protoTx);
		createReq.setCommitment(commonpb.Commitment.SINGLE);

		const createHttpResp = yield submitAgoraReq(createAccountURL, createReq.serializeBinary());
		const createResp = accountpb.CreateAccountResponse.deserializeBinary(createHttpResp.data);

		switch (createResp.getResult()) {
			case accountpb.CreateAccountResponse.Result.OK:
				// TODO: one day maybe add notifications instead of using errors for displaying tx ids
				yield put(
					setTemplateErrors([
						`Submitted transaction to create ${bs58.encode(
							createResp
								.getAccountInfo()
								.getAccountId()
								.getValue_asU8()
						)} with single commitment.`
					])
				);
				yield put({
					type: types.SET_ACCOUNT_UPDATE_REQUIRED,
					payload: true
				});
				break;
			case accountpb.CreateAccountResponse.Result.EXISTS:
				yield put({
					type: types.SET_ACCOUNT_UPDATE_REQUIRED,
					payload: true
				});
				yield put(setTemplateErrors(['An account with the randomly generated address exists. Please try again.']));
				break;
			case accountpb.CreateAccountResponse.Result.PAYER_REQUIRED:
				yield put(
					setTemplateErrors([
						'The transaction to create a token account failed because the transaction subsidizer did not sign the transaction.'
					])
				);
				break;
			case accountpb.CreateAccountResponse.Result.BAD_NONCE:
				yield put(
					setTemplateErrors(['The transaction to create a token account failed because of a bad nonce. Please try again.'])
				);
				break;
			default:
				yield put(setTemplateErrors(['Something went wrong. Please reload']));
				break;
		}
		yield loading(false);
	} catch (error) {
		yield put(setTemplateErrors([`Create token account request failed (${error.toString()})`]));
		yield loading(false);
	}
}

function getCreateAccountTx(
	recentBlockhash: string,
	tokenAccount: SolanaPublicKey,
	owner: SolanaPublicKey,
	subsidizer: SolanaPublicKey,
	tokenProgram: SolanaPublicKey,
	token: SolanaPublicKey,
	minBalance: number
): Transaction {
	return new Transaction({
		feePayer: subsidizer,
		recentBlockhash: recentBlockhash
	}).add(
		SystemProgram.createAccount({
			fromPubkey: subsidizer,
			newAccountPubkey: tokenAccount,
			lamports: minBalance,
			space: AccountSize,
			programId: tokenProgram
		}),
		TokenProgram.initializeAccount(
			{
				account: tokenAccount,
				mint: token,
				owner: owner
			},
			tokenProgram
		),
		TokenProgram.setAuthority(
			{
				account: tokenAccount,
				currentAuthority: owner,
				newAuthority: subsidizer,
				authorityType: AuthorityType.CloseAccount
			},
			tokenProgram
		)
	);
}

function submitAgoraReq(url: string, data: Uint8Array): Promise<AxiosResponse> {
	return axios.request({
		method: 'post',
		url: url,
		data: data,
		headers: {
			'Content-Type': 'application/proto'
		},
		responseType: 'arraybuffer'
	});
}

function getAccountFromPath(derivationPath: string): number {
	const r = /\d+/g;
	const account = derivationPath.match(r)[2];
	return parseInt(account);
}

// watcher
function* blockchainSaga() {
	yield takeLatest(types.IS_LEDGER_CONNECTED, isLedgerConnected);
	yield takeLatest(types.REQUEST_PUBLIC_KEY, requestPublicKey);
	yield takeLatest(types.GET_PUBLIC_KEY, getPublicKey);
	yield takeLatest(types.GET_ACCOUNT, getAccount);
	yield takeLatest(types.GET_UNSIGNED_TRANSACTION, getUnsignedTransaction);
	yield takeLatest(types.SET_SIGN_TRANSACTION, signTransaction);
	yield takeLatest(types.GET_IS_KEYPAIR_VALID, isKeyPairValid);
	yield takeLatest(types.SET_SIGN_TRANSACTION_KEYPAIR, signTransactionKeyPair);
	yield takeLatest(types.RESOLVE_TOKEN_ACCOUNTS, resolveTokenAccounts);
	yield takeLatest(types.GET_ACCOUNT_INFO, getAccountInfo);
	yield takeLatest(types.GET_SERVICE_CONFIG, getServiceConfig);
	yield takeLatest(types.GET_RECENT_BLOCKHASH, getRecentBlockhash);
	yield takeLatest(types.GET_SOLANA_TRANSACTION, getSolanaTransaction);
	yield takeLatest(types.SIGN_AND_SUBMIT_TRANSACTION, signAndSubmitTransaction);
	yield takeLatest(types.SIGN_AND_SUBMIT_TRANSACTION_LEDGER, signAndSubmitTransactionWithLedger);
	yield takeLatest(types.CREATE_TOKEN_ACCOUNT, createTokenAccount);
	yield takeLatest(types.CREATE_TOKEN_ACCOUNT_LEDGER, createTokenAccountWithLedger);
}

export default blockchainSaga;
