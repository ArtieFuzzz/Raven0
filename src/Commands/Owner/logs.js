const { Command } = require('discord-akairo');
const fs = require('fs');

class LogsCommand extends Command {

	constructor() {
		super('logs', {
			aliases: ['logs'],
			category: 'Owner',
			ownerOnly: true,
			description: {
				usage: 'logs',
				examples: ['logs'],
				description: 'Bot returns logs.',
			},
		});
	}

	async exec(message) {
		fs.readFile('raven0.log', (err, data) => {
			if (err) console.log(err);
			if (!data) return message.channel.send('No data was in the logs or doesn\'t exist yet');

			message.author.send(data.toString());
		});
	}

}

module.exports = LogsCommand;
