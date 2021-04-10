const { Command } = require('klasa');
const ati = require('ati.js');
const { MessageEmbed } = require('discord.js');

class FoxCryptCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['foxdecrypt', 'fd'],
			usage: '[string:str]',
		});
	}

	async run(message, [string]) {
		if (!process.env.KEY) {
			message.channel.send('Err! No key in .env to use to decrypt!');
			return console.log('No KEY in .env a key is required to use foxdecrypt');
		}
		else if (!string) {
			return message.channel.send('No string to decrypt');
		}
		if (!message.channel.type === 'dm') message.delete();
		const key = await ati.fox.keyringLoad(process.env.KEY);
		message.delete();

		const decrypted = await ati.fox.decrypt(string, key);
		const embed = new MessageEmbed()
			.setTitle('Decrypted!')
			.addField('Encrypted', string)
			.addField('Decrypted', decrypted)
			.setFooter('It is recommended that you use this command in this DM instead');
		message.channel.send('You\'ve got mail!').then(i => i.delete({ timeout: 5000 }));
		message.author.send(embed);
	}
}

module.exports = FoxCryptCommand;