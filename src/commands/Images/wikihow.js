const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class WikiHowCommand extends Command {
	constructor() {
		super('wikihow', {
			aliases: ['wikihow', 'wh'],
			category: 'Images',
			description: {
				usage: 'wikihow',
				examples: ['wikihow', 'wh'],
				description: 'Returns a wikihow image.',
			},
		});
	}

	async exec(message) {
		const { article, url } = await ksoft.images.wikihow();
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