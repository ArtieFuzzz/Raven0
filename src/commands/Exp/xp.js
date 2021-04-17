const { Command } = require('klasa');

class XpCommand extends Command {

	constructor(...args) {
		super(...args, { description: 'Check how many points you have.' });
	}

	run(message) {
		if (message.guild.settings.get('exp_status') === false) return message.send('`exp` Is not enabled on this server!');
		return message.send(`You have a total of ${message.author.get('exp')} experience points!`);
	}

}

module.exports = XpCommand;