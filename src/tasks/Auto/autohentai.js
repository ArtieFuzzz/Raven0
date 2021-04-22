const { Task } = require('klasa');
const { MessageEmbed } = require('discord.js');

class AutoHentaiTask extends Task {

	async run({ channel }) {
		const _channel = this.client.channels.get(channel);
		if (!_channel.nsfw) {
			_channel.send(':x: This command only runs in NSFW channels');
			return true;
		}

		const { url, post } = await this.client.ksoft.images.reddit('hentai');
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

module.exports = AutoHentaiTask;