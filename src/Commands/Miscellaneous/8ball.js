const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

class BallCommand extends Command {
	constructor(...args) {
		super(...args, {
			usage: '<string:str>',
		});
	}
	/* Credit to Dark Studio for a part of the code. Line 24 - 33. Line 24, 26 and 28 Edited */
	run(message, args) {
		const Responses = ['Yes', 'No', 'Maybe', 'Probably', 'Not Sure', 'Definitely', 'Certainly', 'Definitely not', 'Certainly not', 'Sure', 'Nope!', '...', '???', '!!!'], Random = Responses[Math.floor(Math.random () * Responses.length)];

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