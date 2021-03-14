/* eslint-disable no-inline-comments */
const { Command } = require('discord-akairo');
const StringCrypto = require('string-crypto');
const { MessageEmbed } = require('discord.js');

class StringCryptCommand extends Command {
	constructor() {
		super('stringcrypt', {
			aliases: ['stringcrypt'],
			category: 'Miscellaneous',
			description: {
				usage: 'stringcrypt blah blah blah',
				examples: ['stringcrypt holy moly this works?'],
				description: 'Encrypts a string.',
			},
			args: [
				{
					id: 'string',
					type: 'string',
					match: 'content',
				}],
		});
	}

	exec(message, args) {
		const options = {
			salt: process.env.SALT,
			iterations: 5,
			digest: 'md5', // one of: 'blake2b512' | 'blake2s256' | 'md4' | 'md5' | 'md5-sha1' | 'mdc2' | 'ripemd160' | 'sha1' | 'sha224' | 'sha256' | 'sha3-224' | 'sha3-256' | 'sha3-384' | 'sha3-512' | 'sha384' | 'sha512' | 'sha512-224' | 'sha512-256' | 'sm3' | 'whirlpool';
		};

		const {
			encryptString: saferEncrypt,
		} = new StringCrypto(options);

		if (!args.string) {
			return message.channel.send('No string was provided to encrypt');
		}
		else if (args.string) {
			message.delete();
			const CryptedString = saferEncrypt(args.string, options.salt);
			const embed = new MessageEmbed()
				.setTitle('String Encrypted!')
				.setDescription(`Original: ${args.string}\nEncrypted: ${CryptedString}`);
			message.author.send(embed);
			message.channel.send('Look in your DM\'s!').then(i => i.delete({ timeout: 5000 }));
		}
	}
}

module.exports = StringCryptCommand;