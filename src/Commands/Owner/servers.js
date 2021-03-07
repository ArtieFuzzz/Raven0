const { Command } = require('discord-akairo');

class PingCommand extends Command {

	constructor() {
		super('servers', {
			aliases: ['servers', 'botserver'],
			category: 'Owner',
			ownerOnly: true,
			description: {
				usage: 'servers',
				examples: ['servers', 'botserver'],
				description: 'Bot returns the servers it\'s in".'
			}
		});
	}

	async exec(message) {
		const guilds = this.client.guilds.cache.map(r => `${r.name} (${r.id})`);
		message.channel.send(guilds);
	}

}

module.exports = PingCommand;
