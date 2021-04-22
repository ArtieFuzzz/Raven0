const { Task } = require('klasa');
const { MessageEmbed } = require('discord.js');

class AutoMemeTask extends Task {

	async run({ channel }) {
		const _channel = this.client.channels.get(channel);
		const { url, post } = await this.client.ksoft.images.meme();
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setColor('RANDOM')
			.setTimestamp()
			.setImage(url);
		_channel.send(embed);

	}

}

module.exports = AutoMemeTask;