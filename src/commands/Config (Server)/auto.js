const { Command } = require('klasa');

class AutoCommand extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			guarded: true,
			usage: '<meme|aww|hentai> <enable|disable>',
			usageDelim: ' ',
			subcommands: true,
			permissionLevel: 6,
		});
	}

	meme(message, [status]) {
		try {
			if (status === 'disable') {
				this.client.schedule.delete(`${message.guild.id}_auto_meme`);
				return message.channel.send('Disabled!');
			}
			else {
				if (this.client.schedule.get(`${message.guild.id}_auto_meme`)) return message.channel.send('It\'s already enabled!');
				this.client.schedule.create('automeme', '*/5 * * * *', {
					data: {
						channel: message.channel.id,
					},
					id: `${message.guild.id}_auto_meme`,
					catchUp: true,
				});
				return message.channel.send(`I've set this channel as the Auto Meme channel (Sends a embed every 5 minutes). To disable: ${message.guild.settings.get('prefix')}auto meme disable`);
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
				this.client.schedule.delete(`${message.guild.id}_auto_aww`);
				return message.channel.send('Disabled!');
			}
			else {
				if (this.client.schedule.get(`${message.guild.id}_auto_aww`)) return message.channel.send('It\'s already enabled!');
				this.client.schedule.create('autoaww', '*/5 * * * *', {
					data: {
						channel: message.channel.id,
					},
					id: `${message.guild.id}_auto_aww`,
					catchUp: true,
				});
			}
			return message.channel.send(`I've set this channel as the Auto Meme channel (Sends a embed every 5 minutes). To disable: ${message.guild.settings.get('prefix')}auto aww disable`);
		}
		catch (err) {
			message.channel.send('An error occurred! Don\'t worry we sent the error to the developers.');
			console.error(err);
		}
	}
	hentai(message, [status]) {
		try {
			if (!message.guild) return true;
			if (!message.channel.nsfw) {
				message.channel.send(':x: This command only runs in NSFW channels');
				return true;
			}

			if (status === 'disable') {
				this.client.schedule.delete(`${message.guild.id}_auto_hentai`);
				return message.channel.send('Disabled!');
			}
			else {
				if (this.client.schedule.get(`${message.guild.id}_auto_hentai`)) return message.channel.send('It\'s already enabled!');
				this.client.schedule.create('autohentai', '*/5 * * * *', {
					data: {
						channel: message.channel.id,
					},
					id: `${message.guild.id}_auto_hentai`,
					catchUp: true,
				});
			}
			return message.channel.send(`I've set this channel as the Auto Hentai channel (Sends a embed every 5 minutes). To disable: ${message.guild.settings.get('prefix')}auto hentai disable`);
		}
		catch (err) {
			message.channel.send('An error occurred! Don\'t worry we sent the error to the developers.');
			console.error(err);
		}
	}
}

module.exports = AutoCommand;