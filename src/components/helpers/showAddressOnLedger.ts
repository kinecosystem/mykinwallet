import * as Kin from 'kin-wallet';

async function showAddress(derviationPath) {
	await Kin.Ledger.getPublicKey("44'/2017'/0'", true, true);
}

export default showAddress;
