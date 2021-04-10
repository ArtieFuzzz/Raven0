const { Command } = require('klasa');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class NoTrapsCommand extends Command {

	constructor(...args) {
		super(...args, {
			usage: '<span:string>',
			bucket: 2,
			cooldown: 1,
			nsfw: true,
		});
	}

	async run(message, [span = 'day']) {

		const { url, post } = await ksoft.images.reddit('NoTraps', { span: span });
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

module.exports = NoTrapsCommand;
