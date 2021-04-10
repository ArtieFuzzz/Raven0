const { Command } = require('klasa');
const owoify = require('owoifyx');

class OwOifyCommand extends Command {

	constructor(...args) {
		super(...args, {
			usage: '<text:string>',
		});
	}

	async run(message, [text]) {

		try {
			message.channel.send(owoify(text));
		}
		catch (err) {
			return message.channel.send(err.message);
		}
	}

}

module.exports = OwOifyCommand;
