const { Command } = require('discord-akairo');
const owoify = require('owoifyx');

class OwOifyCommand extends Command {

	constructor() {
		super('owoify', {
			aliases: ['owoify', 'owo'],
			category: 'Miscellaneous',
			args: [
				{
					id: 'text',
					type: 'string',
					match: 'content'
				} ],
			description: {
				usage: 'owoify [Text]',
				examples: ['owoify Person hates me', 'owoify Help me with this test'],
				description: 'OWOify your text.'
			}
		});
	}

	async exec(message, args) {
		if (!args.text) return message.channel.send('I\'ve got nothing to convert!');
		try {
			message.channel.send(owoify(args.text));
		} catch (err) {
			return message.channel.send(err.message);
		}
	}

}

module.exports = OwOifyCommand;
