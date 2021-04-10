const { Command } = require('klasa');

class InfoCommand extends Command {

	constructor(...args) {
		super(...args, {
		});
	}

	async run(message) {
		message.channel.send('This project was inspired by Aero -https://aero.bot');
	}
}

module.exports = InfoCommand;
