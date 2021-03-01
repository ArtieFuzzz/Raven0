const { Command } = require('discord-akairo');

class E926Command extends Command {
	constructor() {
		super('e926', {
			aliases: ['e926'],
			category: 'SFW',
			description: {
				usage: 'e926 [tags]',
				examples: ['e926', 'example2'],
				description: 'Example.',
			},
		});
	}

	exec(message) {
		// Code here
	}
}

module.exports = E926Command;