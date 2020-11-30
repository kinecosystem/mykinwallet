// https://github.com/nodejs/node/blob/v15.x/lib/internal/validators.js#L126-L129
function validateNumber(value, name) {
	if (typeof value !== 'number') {
		throw new Error(`The "${name}" argument must be of type number. Received type ${typeof value}`);
	}
}

// https://github.com/nodejs/node/blob/v15.x/lib/internal/buffer.js#L50-L54
function checkBounds(buf, offset, byteLength) {
	validateNumber(offset, 'offset');
	if (buf[offset] === undefined || buf[offset + byteLength] === undefined) boundsError(offset, buf.length - (byteLength + 1));
}

// https://github.com/nodejs/node/blob/v15.x/lib/internal/buffer.js#L56-L73
function checkInt(value, min, max, buf, offset, byteLength) {
	if (value > max || value < min) {
		const n = typeof min === 'bigint' ? 'n' : '';
		let range;
		if (byteLength > 3) {
			if (min === 0 || min === BigInt(0)) {
				range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`;
			} else {
				range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` + `${(byteLength + 1) * 8 - 1}${n}`;
			}
		} else {
			range = `>= ${min}${n} and <= ${max}${n}`;
		}
		throw new Error(`The value of "value" is out of range. It must be ${range}. Received ${value}`);
	}
	checkBounds(buf, offset, byteLength);
}

// Refers https://github.com/nodejs/node/blob/v15.x/lib/internal/buffer.js#L75-L87 but only for "offset".
function boundsError(value, length) {
	if (Math.floor(value) !== value) {
		validateNumber(value, 'offset');
		throw new Error(`The value of "offset" is out of range. It must be an integer. Received ${value}`);
	}

	if (length < 0) {
		throw new Error('Attempt to access memory outside buffer bounds');
	}

	throw new Error(`The value of "offset" is out of range. It must be >= 0 and <= {${length}}. Received ${value}`);
}

// https://github.com/nodejs/node/blob/v15.x/lib/internal/buffer.js#L90-L108
export function readBigUInt64LE(buffer: Buffer, offset = 0): bigint {
	validateNumber(offset, 'offset');
	const first = buffer[offset];
	const last = buffer[offset + 7];
	if (first === undefined || last === undefined) {
		boundsError(offset, this.length - 8);
	}

	const lo = first + buffer[++offset] * 2 ** 8 + buffer[++offset] * 2 ** 16 + buffer[++offset] * 2 ** 24;

	const hi = buffer[++offset] + buffer[++offset] * 2 ** 8 + buffer[++offset] * 2 ** 16 + last * 2 ** 24;

	return BigInt(lo) + (BigInt(hi) << BigInt(32));
}

// https://github.com/nodejs/node/blob/v15.x/lib/internal/buffer.js#L576-L596
function writeBigU_Int64LE(buf, value, offset, min, max) {
	checkInt(value, min, max, buf, offset, 7);

	let lo = Number(value & BigInt('0xffffffff'));
	buf[offset++] = lo;
	lo = lo >> 8;
	buf[offset++] = lo;
	lo = lo >> 8;
	buf[offset++] = lo;
	lo = lo >> 8;
	buf[offset++] = lo;
	let hi = Number((value >> BigInt(32)) & BigInt('0xffffffff'));
	buf[offset++] = hi;
	hi = hi >> 8;
	buf[offset++] = hi;
	hi = hi >> 8;
	buf[offset++] = hi;
	hi = hi >> 8;
	buf[offset++] = hi;
	return offset;
}

// https://github.com/nodejs/node/blob/v15.x/lib/internal/buffer.js#L598-L600
export function writeBigUInt64LE(buffer: Buffer, value: bigint, offset = 0) {
	return writeBigU_Int64LE(buffer, value, offset, BigInt(0), BigInt('0xffffffffffffffff'));
}
