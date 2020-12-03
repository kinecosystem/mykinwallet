// Code below mostly pulled from https://github.com/kinecosystem/app-solana/blob/v1.0.2/examples/example-sign.js

const bs58 = require('bs58');

const INS_GET_PUBKEY = 0x05;
const INS_SIGN_MESSAGE = 0x06;

const P1_NON_CONFIRM = 0x00;
const P1_CONFIRM = 0x01;

const P2_EXTEND = 0x01;
const P2_MORE = 0x02;

const MAX_PAYLOAD = 255;

const LEDGER_CLA = 0xe0;

/*
 * Helper for chunked send of large payloads
 */
async function solana_send(transport, instruction, p1, payload) {
	var p2 = 0;
	var payload_offset = 0;

	if (payload.length > MAX_PAYLOAD) {
		while (payload.length - payload_offset > MAX_PAYLOAD) {
			const buf = payload.slice(payload_offset, payload_offset + MAX_PAYLOAD);
			payload_offset += MAX_PAYLOAD;
			const reply = await transport.send(LEDGER_CLA, instruction, p1, p2 | P2_MORE, buf);
			if (reply.length != 2) {
				throw new Error('solana_send: Received unexpected reply payload');
			}
			p2 |= P2_EXTEND;
		}
	}

	const buf = payload.slice(payload_offset);
	const reply = await transport.send(LEDGER_CLA, instruction, p1, p2, buf);

	return reply.slice(0, reply.length - 2);
}

const BIP32_HARDENED_BIT = (1 << 31) >>> 0;
function _harden(n) {
	return (n | BIP32_HARDENED_BIT) >>> 0;
}

export function solana_derivation_path(account, change) {
	var length;
	if (typeof account === 'number') {
		if (typeof change === 'number') {
			length = 4;
		} else {
			length = 3;
		}
	} else {
		length = 2;
	}

	var derivation_path = Buffer.alloc(1 + length * 4);
	var offset = 0;
	offset = derivation_path.writeUInt8(length, offset);
	offset = derivation_path.writeUInt32BE(_harden(44), offset); // Using BIP44
	offset = derivation_path.writeUInt32BE(_harden(2017), offset); // Solana's BIP44 path

	if (length > 2) {
		offset = derivation_path.writeUInt32BE(_harden(account), offset);
		if (length == 4) {
			offset = derivation_path.writeUInt32BE(_harden(change), offset);
		}
	}

	return derivation_path;
}

export async function solana_ledger_get_pubkey(transport, derivation_path) {
	return solana_send(transport, INS_GET_PUBKEY, P1_NON_CONFIRM, derivation_path);
}

export async function solana_ledger_sign_transaction(transport, derivation_path, transaction) {
	const msg_bytes = transaction.serializeMessage();

	// XXX: Ledger app only supports a single derivation_path per call ATM
	var num_paths = Buffer.alloc(1);
	num_paths.writeUInt8(1);

	const payload = Buffer.concat([num_paths, derivation_path, msg_bytes]);

	return solana_send(transport, INS_SIGN_MESSAGE, P1_CONFIRM, payload);
}
