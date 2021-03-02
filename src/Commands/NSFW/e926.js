const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const yiff = require('yiff');
const config = require('../../Config/yiff.config.js');


class E926Command extends Command {
	constructor() {
		super('e926', {
			aliases: ['e926'],
			category: 'NSFW',
			args: [
				{
					id: 'tags',
					type: 'string',
					match: 'content',
				}],
			description: {
				usage: 'e926 [tags]',
				examples: ['e926 dog', 'e926 cat'],
				description: 'Get an image from E926.',
			},
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
			let e9 = new yiff.e926(config);
			if (!args.tags) return message.channel.send('No tags were specified');
			const { image, page, score, artist } = await e9.request(args.tags);

			const embed = new MessageEmbed()
				.setTitle('Source')
				.setURL(page)
				.setFooter(`Artist(s): ${artist} | Upvotes: ${score.up} | Downvotes: ${score.down} | Total Score: ${score.total}`)
				.setImage(image)
				.setColor('RANDOM');
			message.channel.send(embed);
		}
		catch (e) {
			return message.channel.send(e.message);
		}
	}
}

module.exports = E926Command;