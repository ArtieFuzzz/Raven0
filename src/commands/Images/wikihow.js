const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

class WikiHowCommand extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['wh'],
			bucket: 2,
			cooldown: 1,
		});
	}

	async run(message) {
		const { article, url } = await this.client.ksoft.images.wikihow();
		const embed = new MessageEmbed()
			.setTitle(article.title)
			.setFooter('Powered by api.ksoft.si')
			.setURL(article.link)
			.setColor('RANDOM')
			.setImage(url)
			.setTimestamp();
		message.channel.send(embed);
	}

}

module.exports = WikiHowCommand;
