const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

class DankMemeCommand extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['dkm'],
			bucket: 2,
			cooldown: 1,
		});
	}

	async run(message) {
		const { url, post } = await this.client.ksoft.images.reddit('dankmemes');
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setTimestamp()
			.setImage(url)
			.setColor('RANDOM');
		message.channel.send(embed);
	}

}

module.exports = DankMemeCommand;
