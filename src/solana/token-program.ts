import { AccountMeta, PublicKey as SolanaPublicKey, TransactionInstruction } from '@solana/web3.js';
import { readBigUInt64LE, writeBigUInt64LE } from './buffer-utils';

// Reference: https://github.com/solana-labs/solana-program-library/blob/11b1e3eefdd4e523768d63f7c70a7aa391ea0d02/token/program/src/state.rs#L125
export const AccountSize = 165;

export enum Command {
	InitializeMint = 0,
	InitializeAccount = 1,
	InitializeMultisig = 2,
	Transfer = 3,
	Approve = 4,
	Revoke = 5,
	SetAuthority = 6,
	MintTo = 7,
	Burn = 8,
	CloseAccount = 9,
	FreezeAccount = 10,
	ThawAccount = 11,
	Transfer2 = 12,
	Approve2 = 13,
	MintTo2 = 14,
	Burn2 = 15
}

export enum AuthorityType {
	MintTokens = 0,
	FreezeAccount = 1,
	AccountHolder = 2,
	CloseAccount = 3
}

export interface InitializeAccountParams {
	account: SolanaPublicKey;
	mint: SolanaPublicKey;
	owner: SolanaPublicKey;
}

export interface TransferParams {
	source: SolanaPublicKey;
	dest: SolanaPublicKey;
	owner: SolanaPublicKey;
	amount: bigint;
}

export interface SetAuthorityParams {
	account: SolanaPublicKey;
	currentAuthority: SolanaPublicKey;
	newAuthority?: SolanaPublicKey;
	authorityType: AuthorityType;
}

export class TokenInstruction {
	/**
	 * Decode a initialize account token instruction and retrieve the instruction params.
	 */
	static decodeInitializeAccount(instruction: TransactionInstruction, tokenProgram: SolanaPublicKey): InitializeAccountParams {
		this.checkProgramId(instruction.programId, tokenProgram);
		this.checkKeyLength(instruction.keys, 4);
		this.checkData(instruction.data, 1, Command.InitializeAccount);

		return {
			account: instruction.keys[0].pubkey,
			mint: instruction.keys[1].pubkey,
			owner: instruction.keys[2].pubkey
		};
	}

	/**
	 * Decode a transfer token instruction and retrieve the instruction params.
	 */
	static decodeTransfer(instruction: TransactionInstruction, tokenProgram?: SolanaPublicKey): TransferParams {
		if (tokenProgram) {
			this.checkProgramId(instruction.programId, tokenProgram);
		}
		this.checkKeyLength(instruction.keys, 3);
		this.checkData(instruction.data, 9, Command.Transfer);

		return {
			source: instruction.keys[0].pubkey,
			dest: instruction.keys[1].pubkey,
			owner: instruction.keys[2].pubkey,
			amount: readBigUInt64LE(instruction.data, 1)
		};
	}

	/**
	 * Decode a set authority transfer
	 */
	static decodeSetAuthority(instruction: TransactionInstruction, tokenProgram: SolanaPublicKey): SetAuthorityParams {
		this.checkProgramId(instruction.programId, tokenProgram);
		this.checkKeyLength(instruction.keys, 2);

		if (instruction.data.length < 3) {
			throw new Error(`invalid instruction data size: ${instruction.data.length}`);
		}

		if (instruction.data[2] == 0) {
			this.checkData(instruction.data, 3, Command.SetAuthority);
		}
		if (instruction.data[2] == 1) {
			this.checkData(instruction.data, 35, Command.SetAuthority);
		}

		return {
			account: instruction.keys[0].pubkey,
			currentAuthority: instruction.keys[1].pubkey,
			authorityType: instruction.data[1],
			newAuthority: instruction.data[2] == 1 ? new SolanaPublicKey(instruction.data.slice(3)) : undefined
		};
	}

	private static checkProgramId(programId: SolanaPublicKey, expectedProgramId: SolanaPublicKey) {
		if (!programId.equals(expectedProgramId)) {
			throw new Error('invalid instruction; programId is not expected program id');
		}
	}

	private static checkKeyLength(keys: AccountMeta[], expectedLength: number) {
		if (keys.length !== expectedLength) {
			throw new Error(`invalid instruction; found ${keys.length} keys, expected at least ${expectedLength}`);
		}
	}

	private static checkData(data: Buffer, expectedLength: number, expectedCommand: Command) {
		if (data.length !== expectedLength) {
			throw new Error(`invalid instruction data size: ${data.length}`);
		}

		if (data[0] !== expectedCommand) {
			throw new Error(`invalid instruction data: ${data}`);
		}
	}
}

export class TokenProgram {
	static get rentSysVar(): SolanaPublicKey {
		return new SolanaPublicKey('SysvarRent111111111111111111111111111111111');
	}

	/**
	 * Generate a transaction instruction that initializes an account.
	 */
	static initializeAccount(params: InitializeAccountParams, tokenProgram: SolanaPublicKey): TransactionInstruction {
		return new TransactionInstruction({
			keys: [
				{ pubkey: params.account, isSigner: true, isWritable: true },
				{ pubkey: params.mint, isSigner: false, isWritable: false },
				{ pubkey: params.owner, isSigner: false, isWritable: false },
				{ pubkey: this.rentSysVar, isSigner: false, isWritable: false }
			],
			programId: tokenProgram,
			data: Buffer.from(new Uint8Array([Command.InitializeAccount]))
		});
	}

	/**
	 * Generate a transaction instruction that transfers Kin from one account to another.
	 */
	static transfer(params: TransferParams, tokenProgram: SolanaPublicKey): TransactionInstruction {
		const b = Buffer.alloc(9);
		b.writeUInt8(Command.Transfer, 0);
		writeBigUInt64LE(b, params.amount, 1);
		return new TransactionInstruction({
			keys: [
				{ pubkey: params.source, isSigner: false, isWritable: true },
				{ pubkey: params.dest, isSigner: false, isWritable: true },
				{ pubkey: params.owner, isSigner: true, isWritable: true }
			],
			programId: tokenProgram,
			data: b
		});
	}

	/**
	 * Generate a transaction instruction that sets the authority of an account.
	 */
	static setAuthority(params: SetAuthorityParams, tokenProgram: SolanaPublicKey): TransactionInstruction {
		let b: Buffer;
		if (params.newAuthority) {
			b = Buffer.alloc(35);
		} else {
			b = Buffer.alloc(3);
		}

		b.writeUInt8(Command.SetAuthority, 0);
		b.writeUInt8(params.authorityType, 1);
		if (params.newAuthority) {
			b.writeUInt8(1, 2);
			b.fill(params.newAuthority.toBuffer(), 3);
		} else {
			b.writeUInt8(0, 2);
		}

		return new TransactionInstruction({
			keys: [
				{ pubkey: params.account, isSigner: false, isWritable: true },
				{ pubkey: params.currentAuthority, isSigner: true, isWritable: false }
			],
			programId: tokenProgram,
			data: b
		});
	}
}
