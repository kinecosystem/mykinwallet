import { StrKey, Keypair } from '@kinecosystem/kin-sdk';
import { PublicKey as SolanaPublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

// PublicKey is a blockchain agnostic representation
// of an ed25519 public key.
export class PublicKey {
	buffer: Buffer;

	constructor(b: Buffer) {
		this.buffer = b;
	}

	static fromString(address: string): PublicKey {
		if (address.length != 56) {
			throw new Error('address format not supported');
		}

		if (address[0] == 'G') {
			return new PublicKey(StrKey.decodeEd25519PublicKey(address));
		}

		const decoded58 = bs58.decode(address);
		if (decoded58.length == 32) {
			return new PublicKey(decoded58);
		}

		throw new Error('address is not a public key');
	}

	static fromBase58(address: string): PublicKey {
		const decoded58 = bs58.decode(address);
		if (decoded58.length == 32) {
			return new PublicKey(decoded58);
		}

		throw new Error('address is not a base58-encoded public key');
	}

	toBase58(): string {
		return bs58.encode(this.buffer);
	}

	stellarAddress(): string {
		return StrKey.encodeEd25519PublicKey(this.buffer);
	}

	equals(other: PublicKey): boolean {
		return this.buffer.equals(other.buffer);
	}

	solanaKey(): SolanaPublicKey {
		return new SolanaPublicKey(this.buffer);
	}
}

// PrivateKey is a blockchain agnostic representation of an
// ed25519 private key.
export class PrivateKey {
	kp: Keypair;

	constructor(kp: Keypair) {
		this.kp = kp;
	}

	static random(): PrivateKey {
		return new PrivateKey(Keypair.random());
	}

	static fromString(seed: string): PrivateKey {
		if (seed[0] == 'S' && seed.length == 56) {
			return new PrivateKey(Keypair.fromSecret(seed));
		}

		// attempt to parse
		return new PrivateKey(Keypair.fromRawEd25519Seed(Buffer.from(seed, 'hex')));
	}

	static fromBase58(seed: string): PrivateKey {
		const decoded58 = bs58.decode(seed);
		if (decoded58.length == 32) {
			return new PrivateKey(Keypair.fromRawEd25519Seed(Buffer.from(decoded58)));
		}

		throw new Error('seed is not a valid base58-encoded secret seed');
	}

	toBase58(): string {
		return bs58.encode(this.kp.rawSecretKey());
	}

	publicKey(): PublicKey {
		return new PublicKey(this.kp.rawPublicKey());
	}
	stellarSeed(): string {
		return this.kp.secret();
	}
	secretKey(): Buffer {
		return Buffer.concat([this.kp.rawSecretKey(), this.kp.rawPublicKey()]);
	}

	equals(other: PrivateKey): boolean {
		return this.kp.rawSecretKey().equals(other.kp.rawSecretKey());
	}
}
