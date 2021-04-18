const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

class PrequelMemeCommand extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pmeme'],
			bucket: 2,
			cooldown: 1,
		});
	}

	async run(message) {
		const { url, post } = await this.client.ksoft.images.reddit('PrequelMemes');
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setColor('RANDOM')
			.setTimestamp()
			.setImage(url);
		message.channel.send(embed);
	}

}

module.exports = PrequelMemeCommand;
