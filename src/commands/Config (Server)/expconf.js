const { Command } = require('klasa');

class ExperienceConfCommand extends Command {
	constructor(...args) {
		super(...args, {
			permissionLevel: 6,
			usage: '<status:boolean>',
		});
	}

	run(message, [status]) {
		const serverconf = message.guild.settings;

		try {
			serverconf.update('exp_status', status);
			message.channel.send(`Set to ${status}`);
		}
		catch (err) {
			message.channel.send('An error happened!').then(console.log(err));
		}
	}
}

module.exports = ExperienceConfCommand;