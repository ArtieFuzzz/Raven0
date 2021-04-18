const { Command } = require('klasa');

class AntiInviteCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['noinvite'],
			permissionLevel: 6,
			usage: '<status:boolean>',
		});
	}

	run(message, [status]) {
		const serverconf = message.guild.settings;

		try {
			serverconf.update('anti_invite', status);
			message.channel.send(`Set to ${status}`);
		}
		catch (err) {
			message.channel.send('An error happened!').then(console.log(err));
		}
	}
}

module.exports = AntiInviteCommand;