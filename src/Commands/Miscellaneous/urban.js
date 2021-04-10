const { Command } = require('klasa');
const c = require('@aero/centra');
const { MessageEmbed } = require('discord.js');

class UrbanCommand extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ud'],
			usage: '[search:string]',
		});
	}

	async run(message, [search]) {
		try {
			const res = await c(`https://api.urbandictionary.com/v0/define?term=${search}`).send();
			const { list } = await res.json();
			const embed = new MessageEmbed()
				.setTitle(list[0].word)
				.setDescription(list[0].definition)
				.addField('Example', list[0].example)
				.setURL(list[0].permalink)
				.setFooter(`Author: ${list[0].author} | ID: ${list[0].defid} | Upvotes: ${list[0].thumbs_up} | Downvotes: ${list[0].thumbs_down}`);
			message.channel.send(embed);
		}
		catch (err) {
			return message.channel.send(err.message);
		}
	}

}

module.exports = UrbanCommand;
