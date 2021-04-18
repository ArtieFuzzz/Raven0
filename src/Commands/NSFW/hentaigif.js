const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

class HentaiGifCommand extends Command {

	constructor(...args) {
		super(...args, {
			bucket: 2,
			cooldown: 1,
			nsfw: true,
		});
	}

	async run(message) {

		const { url } = await this.client.ksoft.images.random('hentai_gif', { nsfw: true });
		const embed = new MessageEmbed()
			.setTitle('Hentai!!')
			.setFooter('Powered by api.ksoft.si')
			.setColor('RANDOM')
			.setTimestamp()
			.setImage(url);
		message.channel.send(embed);
	}

}

module.exports = HentaiGifCommand;
