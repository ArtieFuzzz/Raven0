const { Command } = require('klasa');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class AwwCommand extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['awww'],
			bucket: 2,
			cooldown: 1,
		});
	}

	async run(message) {
		const { url, post } = await ksoft.images.aww();
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

module.exports = AwwCommand;
