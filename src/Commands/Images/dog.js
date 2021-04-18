const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

class DogCommand extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['doggo'],
			bucket: 2,
			cooldown: 1,
		});
	}

	async run(message) {
		const { url } = await this.client.ksoft.images.random('dog');
		const embed = new MessageEmbed()
			.setTitle('Doggo\'s!')
			.setFooter('Powered by api.ksoft.si')
			.setTimestamp()
			.setImage(url)
			.setColor('RANDOM');
		message.channel.send(embed);
	}

}

module.exports = DogCommand;
