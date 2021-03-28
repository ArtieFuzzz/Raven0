const { Command } = require('discord-akairo');

class TestCommand extends Command {
	constructor() {
		super('test', {
			aliases: ['test', 't'],
			category: 'Owner',
			ownerOnly: true,
			description: {
				usage: 'N/A',
				examples: ['N/A'],
				description: 'A test command.',
			},
			args: [
				{
					id: 'text',
					type: 'string',
					match: 'separate',
				} ],
		});
	}

	exec(message, args) {
		message.channel.send(args.text);
	}
}

module.exports = TestCommand;