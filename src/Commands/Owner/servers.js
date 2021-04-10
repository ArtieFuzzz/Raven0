const { Command } = require('klasa');

class ServersCommand extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['servers', 'botserver'],
			category: 'Owner',
			ownerOnly: true,
			description: {
				usage: 'servers',
				examples: ['servers', 'botserver'],
				description: 'Bot returns the servers it\'s in.',
			},
		});
	}

	async run(message) {
		const guilds = this.client.guilds.cache.map(r => `${r.name} (${r.id})`);
		message.channel.send(guilds);
	}

}

module.exports = ServersCommand;
