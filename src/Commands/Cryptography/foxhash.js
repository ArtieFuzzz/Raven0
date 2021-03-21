const { Command } = require('discord-akairo');
const blu = require('@raven-studio/blu');
const { MessageEmbed } = require('discord.js');

class FoxHashCommand extends Command {
	constructor() {
		super('foxhash', {
			aliases: ['foxhash', 'hash', 'fh'],
			category: 'Cryptography',
			description: {
				usage: 'foxhash [string / password]',
				examples: ['foxhash Pa$$W0RD', 'foxhash or a string?'],
				description: 'Hash a string / password.',
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
			message.channel.send('Err! No key in .env to use to hash!');
			return console.log('No KEY in .env a key is required to use foxhash');
		}
		else if (!args.string) {
			return message.channel.send('No string to hash!');
		}
		const key = await blu.fox.keyringLoad(process.env.KEY);
		message.delete();

		const hashed = blu.fox.hash(args.string, key);
		const embed = new MessageEmbed()
			.setTitle('Hashed!')
			.addField('Un-hashed', args.string)
			.addField('Hashed', hashed)
			.setFooter('It is recommended that you use this command in a DM instead with the Bot');
		message.channel.send('You\'ve got mail!').then(i => i.delete({ timeout: 5000 }));
		message.author.send(embed);
	}
}

module.exports = FoxHashCommand;