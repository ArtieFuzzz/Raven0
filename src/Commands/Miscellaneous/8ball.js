const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class BallCommand extends Command {
	constructor() {
		super('8ball', {
			aliases: ['8ball'],
			category: 'Miscellaneous',
			description: {
				usage: '8ball <Question>',
				examples: ['8ball Do you love me?', '8ball Is my code crap?'],
				description: 'Let the 8ball decide your fate.',
			},
			args: [
				{
					id: 'question',
					type: 'string',
					match: 'content',
				} ],
		});
	}
	/* Credit to Dark Studio for a part of the code. Line 24 - 33. Line 24, 26 and 28 Edited */
	exec(message, args) {
		const Responses = ['Yes', 'No', 'Maybe', 'Probably', 'Not Sure', 'Definitely', 'Certainly', 'Definitely not', 'Certainly not', 'Sure', 'Nope!'], Random = Responses[Math.floor(Math.random () * Responses.length)];

		if (!args.question) return message.channel.send('Please Give Your Question!');
		const Embed = new MessageEmbed()
			.setColor('RANDOM')
			.setDescription(Random)
			.setFooter(`Requested By ${message.author.username}`)
			.setTimestamp();

		return message.channel.send(Embed);
	}
}

module.exports = BallCommand;