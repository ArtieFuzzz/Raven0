const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const yiff = require('yiff');
const config = require('../../Config/yiff.config.js');

class E621Command extends Command {
	constructor() {
		super('e621', {
			aliases: ['e621'],
			category: 'NSFW',
			args: [
				{
					id: 'tags',
					type: 'string',
					match: 'content',
				}],
			description: {
				usage: 'e621 [Tag]',
				examples: ['e621 love gay', 'e621 cat'],
				description: 'Get an image from E621.',
			},
			ratelimit: '3',
			cooldown: '3000',
		});
	}

	async exec(message, args) {
		if (!message.guild) return true;
		if (!message.channel.nsfw) {
			message.util.send(':x: This command only runs in NSFW channels');
			return true;
		}
		try {
		// eslint-disable-next-line prefer-const
			let e6 = new yiff.e621(config);
			if (!args.tags) return message.channel.send('No tags were specified');
			const { image, page, score, artist } = await e6.request(args.tags);

			const embed = new MessageEmbed()
				.setTitle('Source')
				.setURL(page)
				.setFooter(`Artist(s): ${artist} | Upvotes ${score.up} | Downvotes ${score.down} | Total Score: ${score.total}`)
				.setImage(image)
				.setColor('RANDOM');
			message.channel.send(embed);
		}
		catch (e) {
			return message.channel.send(e.message);
		}
	}
}

module.exports = E621Command;