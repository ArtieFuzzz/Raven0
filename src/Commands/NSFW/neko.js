const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

class NekoCommand extends Command {

	constructor(...args) {
		super(...args, {
			bucket: 2,
			cooldown: 1,
			nsfw: true,
		});
	}

	async run(message) {

		const { url } = await this.client.ksoft.images.random('neko', { nsfw: true });
		const embed = new MessageEmbed()
			.setTitle('.w.')
			.setFooter('Powered by api.ksoft.si')
			.setColor('RANDOM')
			.setTimestamp()
			.setImage(url);
		message.channel.send(embed);
	}

}

module.exports = NekoCommand;
