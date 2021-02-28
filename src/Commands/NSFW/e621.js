const { Command } = require('discord-akairo');

class E621Command extends Command {
	constructor() {
		super('e621', {
			aliases: ['e621'],
			category: 'NSFW',
			description: {
				usage: 'e621 [Tag]',
				examples: ['example', 'example2'],
				description: 'Example.',
			},
		});
	}

	exec(message) {
		// Code here
	}
}

module.exports = E621Command;