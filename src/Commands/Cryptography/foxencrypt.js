const { Command } = require('discord-akairo');
const blu = require('@raven-studio/blu');
const { MessageEmbed } = require('discord.js');
const { createLog } = require('@raven-studio/logs');

class FoxCryptCommand extends Command {
	constructor() {
		super('foxcrypt', {
			aliases: ['foxcrypt', 'foxencrypt', 'fe'],
			category: 'Cryptography',
			description: {
				usage: 'foxcrypt [Plain Text]',
				examples: ['foxcrypt This is a short sentance', 'fe Hello!'],
				description: 'Encrypt your Plain Text. (This command is kinda experimental)',
			},
			args: [
				{
					id: 'string',
					type: 'string',
					match: 'content',
				}],
		});
	}

	async exec(message, args) {
		if (!process.env.KEY) {
			message.channel.send('Err! No key in .env to use to encrypt!');
			return console.log('No KEY in .env a key is required to use foxcrypt');
		}
		else if (!args.string) {
			return message.channel.send('No string to encrypt');
		}
		if (!message.channel.type === 'dm') message.delete();
		const key = await blu.fox.keyringLoad(process.env.KEY);

		const encrypted = await blu.fox.encrypt(args.string, key);
		const embed = new MessageEmbed()
			.setTitle('Encrypted!')
			.addField('Unencrypted', args.string)
			.addField('Encrypted', encrypted)
			.setFooter('It is recommended that you use this command in this DM instead');
		message.channel.send('You\'ve got mail!').then(i => i.delete({ timeout: 5000 }));
		message.author.send(embed);
		// Log
		createLog('raven0', `[FoxCrypt] - (${message.author.tag} | ${message.author.id}) ${args.string} | ${encrypted}`);
	}
}

module.exports = FoxCryptCommand;