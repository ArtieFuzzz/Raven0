const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['u'],
			permissionLevel: 10,
			guarded: true,
		});
	}

	async run(message) {
		this.client.guilds.forEach(guild => {
			return message.channel.send(`${guild.name} | ${guild.id}`);
		});
	}

};
