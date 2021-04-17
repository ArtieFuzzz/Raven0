const { Command } = require('klasa');

class AntiLinkCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['nolink'],
			permissionLevel: 6,
			usage: '<status:boolean>',
		});
	}

	run(message, [status]) {
		const serverconf = message.guild.settings;

		try {
			serverconf.update('antilink', status);
			message.channel.send(`Set to ${status}`);
		}
		catch (err) {
			message.channel.send('An error happened!').then(console.log(err));
		}
	}
}

module.exports = AntiLinkCommand;