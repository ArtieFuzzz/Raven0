const { Command } = require('klasa');

class AutoCommand extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			guarded: true,
			usage: '<meme|aww> <enable|disable>',
			usageDelim: ',',
			subcommands: true,
			permissionLevel: 6,
		});
	}

	meme(message, [status]) {
		try {
			if (status === 'disable') {
				this.client.schedule.delete(`${message.guild.id}_${message.channel.id}_auto_meme`);
				message.channel.send('Disabled!');
			}
			else {
				this.client.schedule.create('automeme', '*/5 * * * *', {
					data: {
						channel: message.channel.id,
					},
					id: `${message.guild.id}_${message.channel.id}_auto_meme`,
					catchUp: true,
				});
				message.channel.send(`I've set this channel as the Auto Meme channel. To disable: ${this.client.prefix}auto meme, disable`);
			}
		}
		catch (err) {
			message.channel.send('An error occurred! Don\'t worry we sent the error to the developers.');
			console.error(err);
		}
	}
	aww(message, [status]) {
		try {
			if (status === 'disable') {
				this.client.schedule.delete(`${message.guild.id}_${message.channel.id}_auto_aww`);
				message.channel.send('Disabled!');
			}
			else {
				this.client.schedule.create('autoaww', '*/5 * * * *', {
					data: {
						channel: message.channel.id,
					},
					id: `${message.guild.id}_${message.channel.id}_auto_aww`,
					catchUp: true,
				});
				message.channel.send(`I've set this channel as the Auto Meme channel. To disable: ${this.client.prefix}auto aww, disable`);
			}
		}
		catch (err) {
			message.channel.send('An error occurred! Don\'t worry we sent the error to the developers.');
			console.error(err);
		}
	}
}

module.exports = AutoCommand;