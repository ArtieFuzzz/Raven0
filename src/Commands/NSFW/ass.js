const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

class AssCommand extends Command {

	constructor(...args) {
		super(...args, {
			bucket: 2,
			cooldown: 1,
			nsfw: true,
		});
	}

	async run(message) {

		const { url } = await this.client.ksoft.images.random('ass', { nsfw: true });
		const embed = new MessageEmbed()
			.setTitle('Thicc?')
			.setFooter('Powered by api.ksoft.si')
			.setColor('RANDOM')
			.setTimestamp()
			.setImage(url);
		message.channel.send(embed);
	}

}

module.exports = AssCommand;
