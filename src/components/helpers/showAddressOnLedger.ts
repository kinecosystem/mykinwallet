import * as Kin from 'kin-wallet';

async function showAddress(derviationPath) {
	await Kin.Ledger.getPublicKey(derviationPath, true, true);
}

export default showAddress;
