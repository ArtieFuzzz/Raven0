const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const yiff = require('yiff');
const config = require('../../Config/yiff.config.js');

class E621Command extends Command {

	constructor(...args) {
		super(...args, {
			usage: '[tags:string]',
			bucket: 3,
			cooldown: 5,
			nsfw: true,
		});
	}

	async run(message, [tags]) {

		try {
		// eslint-disable-next-line prefer-const, new-cap
			let e6 = new yiff.e621(config);
			const { image, page, score, artist } = await e6.request(tags);

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
