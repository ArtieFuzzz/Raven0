const { Command } = require('klasa');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class RandNSFWCommand extends Command {

	constructor(...args) {
		super(...args, {
			ratelimit: 2,
			cooldown: 1,
			nsfw: true,
		});
	}

	async run(message) {

		const { url, post } = await ksoft.images.nsfw();
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

module.exports = RandNSFWCommand;
