const { Command } = require('klasa');
const ati = require('ati.js');
const { MessageEmbed } = require('discord.js');

class FoxHashCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['foxhash', 'hash', 'fh'],
			usage: '[string:str]',
		});
	}

	async run(message, [string]) {
		if (!process.env.KEY) {
			message.channel.send('Err! No key in .env to use to hash!');
			return console.log('No KEY in .env a key is required to use foxhash');
		}
		else if (!string) {
			return message.channel.send('No string to hash!');
		}
		if (!message.channel.type === 'dm') message.delete();
		const key = await ati.fox.keyringLoad(process.env.KEY);
		message.delete();

		const hashed = ati.fox.hash(string, key);
		const embed = new MessageEmbed()
			.setTitle('Hashed!')
			.addField('Un-hashed', string)
			.addField('Hashed', hashed)
			.setFooter('It is recommended that you use this command in this DM instead');
		message.channel.send('You\'ve got mail!').then(i => i.delete({ timeout: 5000 }));
		message.author.send(embed);
	}
}

module.exports = FoxHashCommand;