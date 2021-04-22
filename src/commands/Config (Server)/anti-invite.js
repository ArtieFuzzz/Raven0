const { Command } = require('klasa');

class AntiInviteCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['noinvite'],
			permissionLevel: 6,
			usage: '<enable|disable>',
		});
	}

	run(message, [status]) {
		const serverconf = message.guild.settings;

		try {
			if (status === 'enable') {
				serverconf.update('anti.invite', true);
				return message.channel.send('Enabled!');
			}
			if (status === 'disable') {
				serverconf.update('anti.invite', false);
				return message.channel.send('Disabled!');
			}
		}
		catch (err) {
			message.channel.send('An error happened!').then(console.log(err));
		}
	}
}

module.exports = AntiInviteCommand;