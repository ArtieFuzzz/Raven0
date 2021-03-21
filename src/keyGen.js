const blu = require('@raven-studio/blu');

async function keyGen() {
	// Generate the keys
	const SecretKey = await blu.fox.keyGen.asymmetricKey();
	const PublicKey = await SecretKey.getPublicKey();
	const Key = await blu.fox.keyGen();

	// Turn keys into savable strings
	const Sk = await blu.fox.keyring(SecretKey);
	const Pk = await blu.fox.keyring(PublicKey);
	const Ke = await blu.fox.keyring(Key);

	// Log
	console.log(`Private Key:  ${Sk}`);
	console.log(`Public Key: ${Pk}`);
	console.log(`Symmetric Key: ${Ke}`);
}

keyGen();