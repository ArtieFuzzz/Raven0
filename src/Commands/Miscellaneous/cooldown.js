const { Command } = require('discord-akairo');

class CooldownCommand extends Command {
	constructor() {
		super('cooldown', {
			aliases: ['cooldown'],
			category: 'Miscellaneous',
			cooldown: 5000,
			description: {
				usage: 'cooldown',
				examples: ['cooldown'],
				description: 'Cooldown test.',
			},
		});
	}

	exec(message) {
		message.channel.send('Wait again and again');
	}
}

module.exports = CooldownCommand;