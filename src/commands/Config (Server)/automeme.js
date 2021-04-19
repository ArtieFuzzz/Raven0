const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			guarded: false,
			permissionLevel: 6,
		});
	}

	async run(message) {
		try {
			const check_channel = this.client.schedule.get(message.channel.id);
			if (check_channel) {
				this.client.schedule.delete(`${message.guild.id}_${message.channel.id}`).catch(err => {
					console.log(err);
				});
				message.channel.send('Disabled!');
			}
			else {
				this.client.schedule.create('automeme', '*/5 * * * *', {
					data: {
						channel: message.channel.id,
					},
					id: `${message.guild.id}_${message.channel.id}`,
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
};
