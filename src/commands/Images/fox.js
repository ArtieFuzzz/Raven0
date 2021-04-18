const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

class FoxCommand extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['foxx'],
			bucket: 2,
			cooldown: 1,
		});
	}

	async run(message) {
		const { url } = await this.client.ksoft.images.random('fox');
		const embed = new MessageEmbed()
			.setTitle('Fox!')
			.setFooter('Powered by api.ksoft.si')
			.setTimestamp()
			.setImage(url)
			.setColor('RANDOM');
		message.channel.send(embed);
	}

}

module.exports = FoxCommand;
