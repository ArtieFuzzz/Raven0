const { Command } = require('discord-akairo');
const fs = require('fs');

class LogsCommand extends Command {

	constructor() {
		super('readfile', {
			aliases: ['readfile', 'rf'],
			category: 'Owner',
			ownerOnly: true,
			description: {
				usage: 'readfile <File name or path/to/file>',
				examples: ['readfile .env', 'rf raven0.log'],
				description: 'Bot returns read file.',
			},
			args: [
				{
					id: 'pathtofile',
					type: 'string',
					match: 'content',
				} ],
		});
	}

	async exec(message, args) {
		if (!args.pathtofile) return message.channel.send('No path was provided. Try again');

		fs.readFile(args.pathtofile, (err, data) => {
			if (err) console.log(err);
			if (!data) return message.channel.send('No data was in the file or doesn\'t exist');

			message.author.send(data.toString());
			message.channel.send('You\'ve got mail!').then(i => i.delete({ timeout: 5000 }));
		});
	}

}

module.exports = LogsCommand;
