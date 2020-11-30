import { PublicKey as SolanaPublicKey, TransactionInstruction } from '@solana/web3.js';

export interface MemoParams {
	data: string;
}

export class MemoInstruction {
	/**
	 * Decode a memo instruction and retrieve the instruction params.
	 */
	static decodeMemo(instruction: TransactionInstruction): MemoParams {
		this.checkProgramId(instruction.programId);

		return {
			data: instruction.data.toString()
		};
	}

	static checkProgramId(programId: SolanaPublicKey): void {
		if (!programId.equals(MemoProgram.programId)) {
			throw new Error('invalid instruction; programId is not MemoProgam');
		}
	}
}

export class MemoProgram {
	/**
	 * The address of the memo program that should be used.
	 * todo: lock this in, or make configurable.
	 */
	static get programId(): SolanaPublicKey {
		return new SolanaPublicKey('Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo');
	}

	static memo(params: MemoParams): TransactionInstruction {
		return new TransactionInstruction({
			programId: this.programId,
			data: Buffer.from(params.data)
		});
	}
}
