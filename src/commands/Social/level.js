const { Command } = require('klasa');

class LevelCommand extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text', 'dm'],
		});
	}

	run(message) {
		const level = message.author.settings.get('level');

		return message.channel.send(`You are currently level ${level}!`);
	}
}

module.exports = LevelCommand;