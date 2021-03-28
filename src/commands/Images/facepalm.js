const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class FacepalmCommand extends Command {

	constructor() {
		super('facepalm', {
			aliases: ['facepalm', 'fp'],
			category: 'Images',
			description: {
				usage: 'facepalm',
				examples: ['facepalm', 'fm'],
				description: 'Returns a image you should facepalm at.',
			},
			ratelimit: 2,
			cooldown: 1000,
		});
	}

	async exec(message) {
		const { url, post } = await ksoft.images.reddit('facepalm');
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

module.exports = FacepalmCommand;
