const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

class SFWFemboyCommand extends Command {

	constructor(...args) {
		super(...args, {
		});
	}

	async run(message) {
		const { url, post } = await this.client.ksoft.images.reddit('femboy');
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setColor('PINK')
			.setTimestamp()
			.setImage(url);
		message.channel.send(embed);
	}

}

module.exports = SFWFemboyCommand;
