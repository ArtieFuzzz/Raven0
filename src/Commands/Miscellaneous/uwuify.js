const { Command } = require('klasa');
const ati = require('ati.js');

class UwUifyCommand extends Command {
	constructor(...args) {
		super(...args, {
			usage: '[text:string]',
		});
	}

	run(message, [text]) {
		const uwuified = ati.uwuify(text);
		message.channel.send(uwuified);
	}
}

module.exports = UwUifyCommand;