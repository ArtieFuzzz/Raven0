const { Command } = require('klasa');

class PointsCommand extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text', 'dm'],
		});
	}

	run(message) {
		const points = message.author.settings.get('points');

		return message.channel.send(`You currently have ${points} Points!`);
	}
}

module.exports = PointsCommand;