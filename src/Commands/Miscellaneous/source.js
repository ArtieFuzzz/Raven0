const { Command } = require('discord-akairo');

class SourceCommand extends Command {
	constructor() {
		super('source', {
			aliases: ['source', 'src'],
			category: 'Miscellaneous',
			description: {
				usage: 'source',
				examples: ['source', 'src'],
				description: 'Bot returns source.',
			},
		});
	}

	exec(message) {
		message.channel.send('Here you go!\nhttps://gitlab.com/raven-studio/Raven');
	}
}

module.exports = SourceCommand;