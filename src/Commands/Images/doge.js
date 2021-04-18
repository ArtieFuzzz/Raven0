const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

class DogeCommand extends Command {

	constructor(...args) {
		super(...args, {
			ratelimit: 2,
			cooldown: 1,
		});
	}

	async run(message) {
		const { url } = await this.client.ksoft.images.random('doge');
		const embed = new MessageEmbed()
			.setTitle('Doge! Wow')
			.setFooter('Powered by api.ksoft.si')
			.setTimestamp()
			.setImage(url)
			.setColor('RANDOM');
		message.channel.send(embed);
	}

}

module.exports = DogeCommand;
