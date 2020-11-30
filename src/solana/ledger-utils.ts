import LedgerTransport from '@ledgerhq/hw-transport-u2f';
import LedgerStr from '@ledgerhq/hw-app-str';
import { PublicKey } from '../models/keys';
import { Transaction, PublicKey as SolanaPublicKey } from '@solana/web3.js';

export function getPublicKeyFromLedger(bipPath, showDisplay, chainCode, timeout): Promise<SolanaPublicKey> {
	return new Promise((res, rej) => {
		if (!bipPath) {
			rej({ error: 'invalid BIP path' });
			return;
		}

		const onConnect = ledgerApi => {
			ledgerApi
				.getPublicKey(bipPath, chainCode, showDisplay)
				.then(result => {
					const publicKey = PublicKey.fromString(result.publicKey).solanaKey();
					res(publicKey);
				})
				.catch(e => {
					rej(this.getError(e));
				});
		};

		this.connect(timeout)
			.then(onConnect)
			.catch(e => {
				rej(this.getError(e));
			});
	});
}

export function signWithLedger(bipPath, tx: Transaction, timeout: number) {
	return new Promise((res, rej) => {
		if (!bipPath) {
			rej({ error: 'invalid BIP path' });
			return;
		}

		const onConnect = ledgerApi => {
			ledgerApi
				.signTransaction(bipPath, tx.serializeMessage())
				.then(result => {
					const { signature } = result;
					this.getPublicKey(bipPath).then(function(pubkey: SolanaPublicKey) {
						tx.addSignature(pubkey, signature);
						res(tx);
					});
				})
				.catch(err => {
					rej(this.getError(err));
				});
		};

		this.connect(timeout)
			.then(onConnect)
			.catch(err => {
				rej(this.getError(err));
			});
	});
}

export function connectToLedger(timeout: number) {
	return new Promise((res, rej) => {
		const onError = err => {
			rej(this.getError(err));
		};

		const openTimeout = timeout || 30 * 1000;
		LedgerTransport.create(openTimeout, openTimeout)
			.then(transport => {
				res(new LedgerStr(transport));
			})
			.catch(onError);
	});
}
