const { Command } = require('klasa');
const sxcu = require('sxcu.js');

class PasteCommand extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['cancer', 'code'],
			usage: '<text:string>',
		});
	}

	async run(message, [text]) {
		if (!text) return message.channel.send('Can\'t create a paste from thin air!');
		try {
			const paste = await sxcu.createPaste(text);
			const url = await paste.getUrl();
			message.channel.send(`Created: ${url}`);
		}
		catch (err) {
			return message.channel.send(err.message);
		}
	}

}

module.exports = PasteCommand;
