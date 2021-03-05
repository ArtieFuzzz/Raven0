const { Command } = require('discord-akairo');
const c = require('centra');
const { MessageEmbed } = require('discord.js');

class UrbanCommand extends Command {
	constructor() {
		super('urban', {
			aliases: ['urban', 'ud'],
			category: 'Miscellaneous',
			args: [
				{
					id: 'word',
					type: 'string',
					match: 'content',
				}],
			description: {
				usage: 'urban [Word to search]',
				examples: ['urban Femboy', 'ud simp'],
				description: 'Search a word up on Urban Dictionary.',
			},
		});
	}

	async exec(message, args) {
		if (!args.word) return message.channel.send('I\'ve got nothing to search!');
		try {
			const res = await c(`https://api.urbandictionary.com/v0/define?term=${args.word}`).send();
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