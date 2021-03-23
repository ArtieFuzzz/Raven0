const { Command } = require('discord-akairo');
const ati = require('ati.js');

class UwUifyCommand extends Command {
	constructor() {
		super('uwuify', {
			aliases: ['uwuify', 'uwu'],
			category: 'Miscellaneous',
			description: {
				usage: 'uwuify Hello how may I help?',
				examples: ['uwuify Hi!', 'uwu That\'s not right'],
				description: 'Uwuify your text.',
			},
			args: [
				{
					id: 'text',
					type: 'string',
					match: 'content',
				} ],
		});
	}

	exec(message, args) {
		if (!args.text) {
			return message.channel.send('Nothing but air to uwuify...');
		}
		const uwuified = ati.uwuify(args.text);
		message.channel.send(uwuified);
	}
}

module.exports = UwUifyCommand;