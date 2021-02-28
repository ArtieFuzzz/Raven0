const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class SFWFemboyCommand extends Command {
	constructor() {
		super('sfemboy', {
			aliases: ['sfemboy'],
			category: 'SFW',
			examples: ['sfemboy'],
			description: 'Returns a SFW image from r/femboy',
		});
	}

	async exec(message) {
		const { url, post } = await ksoft.images.reddit('femboy');
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