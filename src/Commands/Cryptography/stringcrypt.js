/* eslint-disable no-inline-comments */
const { Command } = require('klasa');
const StringCrypto = require('string-crypto');
const { MessageEmbed } = require('discord.js');
const { createLog } = require('@raven-studio/logs');

class StringCryptCommand extends Command {
	constructor(...args) {
		super(...args, {
			usage: '[string:str]',
		});
	}

	run(message, [string]) {
		const options = {
			salt: process.env.SALT,
			iterations: 5,
			digest: 'md5', // one of: 'blake2b512' | 'blake2s256' | 'md4' | 'md5' | 'md5-sha1' | 'mdc2' | 'ripemd160' | 'sha1' | 'sha224' | 'sha256' | 'sha3-224' | 'sha3-256' | 'sha3-384' | 'sha3-512' | 'sha384' | 'sha512' | 'sha512-224' | 'sha512-256' | 'sm3' | 'whirlpool';
		};

		const {
			encryptString: saferEncrypt,
		} = new StringCrypto(options);

		if (!string) {
			return message.channel.send('No string was provided to encrypt');
		}
		else if (string) {
			message.delete();
			const CryptedString = saferEncrypt(string, options.salt);
			const embed = new MessageEmbed()
				.setTitle('String Encrypted!')
				.setDescription(`Original: ${string}\nEncrypted: ${CryptedString}`);
			message.author.send(embed);
			message.channel.send('Look in your DM\'s!').then(i => i.delete({ timeout: 5000 }));
			createLog('raven0', `[StringCrypt] - (${message.author.tag} | ${message.author.id}) ${string} | ${CryptedString}`); // Log potentially malious things
		}
	}
}

module.exports = StringCryptCommand;