//  npm package
// https://www.npmjs.com/package/kin-wallet
// npm i kin-wallet

function testLedger() {
	var Kin = window['kin-master-wallet'];

	// Blockchain instance
	let bc = new Kin.Blockchain(true);
	let address;

	// Kin.KeyPair.fromSecret('secret')
	Kin.Ledger.getPublicKey("44'/2017'/0'").then(function(r) {
		address = r.publicKey();
		console.log(address, r);
		N;
		// Getting account data from blockchain
		bc.getAccount(address).then(function(account) {
			// creating unsigned transaction from    to  												   amount memo
			tx = bc.getUnsignedTransaction(account, 'GCN5KANB7DA62ZP55VOTTDLD7VD7PYUBKYCTRWWED7V6F2VL2ZIPS2K3', 2, 'sadasdasdasd');
			console.log(tx);

			// signing the unsigned transaction
			//Kin.KeyPair.signTransaction(secret, tx);
			Kin.Ledger.signTransaction("44'/2017'/0'", tx)
				.then(function(sTx) {
					txx = sTx;

					// publish the transaction to the network
					bc.submitTransaction(txx);
				})
				
		});
	});
}
<script src="/kin_master_wallet.js" />;
