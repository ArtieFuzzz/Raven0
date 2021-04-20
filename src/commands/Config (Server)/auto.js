const { Command } = require('klasa');

class AutoCommand extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			guarded: true,
			usage: '<meme|aww>',
			subcommands: true,
			permissionLevel: 6,
		});
	}

	meme(message) {
		try {
			const check_channel = this.client.schedule.get(`${message.guild.id}_${message.channel.id}_auto_meme`);
			if (check_channel) {
				this.client.schedule.delete(`${message.guild.id}_${message.channel.id}_auto_meme`).catch(err => {
					console.log(err);
				});
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
				message.channel.send('I\'ve set this channel as the Auto Meme channel. To disable run this command in the same channel again');
			}
		}
		catch (err) {
			message.channel.send('An error occurred! Don\'t worry we sent the error to the developers.');
			console.error(err);
		}
	}
	aww(message) {
		try {
			const check_channel = this.client.schedule.get(`${message.guild.id}_${message.channel.id}_auto_aww`);
			if (check_channel) {
				this.client.schedule.delete(`${message.guild.id}_${message.channel.id}_auto_aww`).catch(err => {
					console.log(err);
				});
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
				message.channel.send('I\'ve set this channel as the Auto Meme channel. To disable run this command in the same channel again');
			}
		}
		catch (err) {
			message.channel.send('An error occurred! Don\'t worry we sent the error to the developers.');
			console.error(err);
		}
	}
}

module.exports = AutoCommand;