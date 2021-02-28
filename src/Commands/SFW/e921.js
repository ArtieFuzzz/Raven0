const { Command } = require('discord-akairo');

class E921Command extends Command {
	constructor() {
		super('e921', {
			aliases: ['e921'],
			category: 'SFW',
			description: {
				usage: 'e921',
				examples: ['example', 'example2'],
				description: 'Example.',
			},
		});
	}

	exec(message) {
		// Code here
	}
}

module.exports = E921Command;