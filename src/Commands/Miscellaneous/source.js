const { Command } = require('klasa');

class SourceCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['src'],
		});
	}

	run(message) {
		message.channel.send('Here you go!\nhttps://gitlab.com/raven-studio/Raven');
	}
}

module.exports = SourceCommand;