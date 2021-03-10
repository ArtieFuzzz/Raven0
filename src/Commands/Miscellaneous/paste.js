const { Command } = require('discord-akairo');
const sxcu = require('sxcu.js');

class PasteCommand extends Command {

	constructor() {
		super('paste', {
			aliases: ['paste', 'cancer', 'code'],
			category: 'Miscellaneous',
			args: [
				{
					id: 'text',
					type: 'string',
					match: 'content'
				} ],
			description: {
				usage: 'paste [Text]',
				examples: ['paste code here', 'cancer code here'],
				description: 'Like hastebin.'
			}
		});
	}

	async exec(message, args) {
		if (!args.text) return message.channel.send('Can\'t create a paste from thin air!');
		try {
			const paste = await sxcu.createPaste(args.text);
			const url = await paste.getUrl();
			message.channel.send(url);
		} catch (err) {
			return message.channel.send(err.message);
		}
	}

}

module.exports = PasteCommand;
