const { Command } = require('discord-akairo');
const limit = require('@codedipper/random-code');

class RandomNickCommand extends Command {

	constructor() {
		super('random-nick', {
			aliases: ['random-nick', 'random-nickame'],
			category: 'Miscellaneous',
			description: {
				usage: 'random-nick <@user>',
				examples: ['random-nick @someone#0001', 'random-nickname'],
				description: 'Give a random nickname to mentioned user or yourself.'
			},
			userPermissions: ['MANAGE_NICKNAMES'],
			clientPermissions: ['MANAGE_NICKNAMES']
		});
	}

	exec(message) {
		const memberexe = message.mentions.members.first();
		if (!memberexe) return message.channel.send('Please mention a user!');

		const random = limit(5);
		memberexe.setNickname(random);
		message.channel.send(`Random nickname set! (${random})`).catch(err => message.channel.send(err.message));
	}

}

module.exports = RandomNickCommand;
