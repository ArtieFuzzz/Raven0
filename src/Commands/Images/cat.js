const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

class CatCommand extends Command {

	constructor(...args) {
		super(...args, {
			bucket: 2,
			cooldown: 1,
		});
	}

	async run(message) {
		const { url } = await this.client.ksoft.images.random('cat');
		const embed = new MessageEmbed()
			.setTitle('Cats!')
			.setFooter('Powered by api.ksoft.si')
			.setTimestamp()
			.setImage(url)
			.setColor('RANDOM');
		message.channel.send(embed);
	}

}

module.exports = CatCommand;
