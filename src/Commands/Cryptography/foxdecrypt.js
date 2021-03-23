const { Command } = require('discord-akairo');
const ati = require('ati.js');
const { MessageEmbed } = require('discord.js');

class FoxCryptCommand extends Command {
	constructor() {
		super('foxdecrypt', {
			aliases: ['foxdecrypt', 'fd'],
			category: 'Cryptography',
			description: {
				usage: 'foxdecrypt [Encrypted String]',
				examples: ['foxdecrypt *Long string :v)*'],
				description: 'Decrypt a string that was encrypted with foxencrypt. (This command is kinda experimental)',
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
			message.channel.send('Err! No key in .env to use to decrypt!');
			return console.log('No KEY in .env a key is required to use foxdecrypt');
		}
		else if (!args.string) {
			return message.channel.send('No string to decrypt');
		}
		if (!message.channel.type === 'dm') message.delete();
		const key = await ati.fox.keyringLoad(process.env.KEY);
		message.delete();

		const decrypted = await ati.fox.decrypt(args.string, key);
		const embed = new MessageEmbed()
			.setTitle('Decrypted!')
			.addField('Encrypted', args.string)
			.addField('Decrypted', decrypted)
			.setFooter('It is recommended that you use this command in this DM instead');
		message.channel.send('You\'ve got mail!').then(i => i.delete({ timeout: 5000 }));
		message.author.send(embed);
	}
}

module.exports = FoxCryptCommand;