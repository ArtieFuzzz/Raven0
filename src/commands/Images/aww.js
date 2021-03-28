const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class AwwCommand extends Command {

	constructor() {
		super('aww', {
			aliases: ['aww', 'awww'],
			category: 'Images',
			description: {
				usage: 'aww',
				examples: ['aww', 'awww'],
				description: 'Returns cute image.',
			},
			ratelimit: 2,
			cooldown: 1000,
		});
	}

	async exec(message) {
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
