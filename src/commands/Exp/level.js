const { Command } = require('klasa');

class LevelCommand extends Command {

	constructor(...args) {
		super(...args, { description: 'Check your current level.' });
	}

	run(message) {
		if (message.guild.settings.get('exp_status') === false) return message.send('`exp` Is not enabled on this server!');
		return message.send(`You are currently level ${message.author.get('level')}!`);
	}

}

module.exports = LevelCommand;