const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

class BigTiddyCommand extends Command {

	constructor(...args) {
		super(...args, {
			usage: '[span:string]',
			bucket: 2,
			cooldown: 1,
			nsfw: true,
		});
	}

	async run(message, [span = 'day']) {

		const { url, post } = await this.client.ksoft.images.reddit('bigtiddygothgf', { span: span });
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

module.exports = BigTiddyCommand;
