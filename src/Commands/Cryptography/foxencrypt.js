const { Command } = require('klasa');
const ati = require('ati.js');
const { MessageEmbed } = require('discord.js');
const { createLog } = require('@raven-studio/logs');
const util = require('@sapphire/discord.js-utilities');

class FoxCryptCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['foxcrypt', 'foxencrypt', 'fe'],
			usage: '[string:str]',
		});
	}

	async run(message, [string]) {
		if (!process.env.KEY) {
			message.channel.send('Err! No key in .env to use to encrypt!');
			return console.log('No KEY in .env a key is required to use foxcrypt');
		}
		else if (string) {
			return message.channel.send('No string to encrypt');
		}
		if (!util.isDMChannel) {
			message.delete();
		}

		const key = await ati.fox.keyringLoad(process.env.KEY);

		const encrypted = await ati.fox.encrypt(string, key);
		const embed = new MessageEmbed()
			.setTitle('Encrypted!')
			.addField('Unencrypted', string)
			.addField('Encrypted', encrypted)
			.setFooter('It is recommended that you use this command in this DM instead');
		message.channel.send('You\'ve got mail!').then(i => i.delete({ timeout: 5000 }));
		message.author.send(embed);
		// Log
		createLog('raven0', `[FoxCrypt] - (${message.author.tag} | ${message.author.id}) ${string} | ${encrypted}`);
	}
}

module.exports = FoxCryptCommand;