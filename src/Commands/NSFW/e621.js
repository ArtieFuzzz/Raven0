const { Command } = require('discord-akairo');
const { MesageEmbed } = require('discord.js')
const yiff = require('yiff');
const { config } = require('../yiff.config.js');

class E621Command extends Command {
	constructor() {
		super('e621', {
			aliases: ['e621'],
			category: 'NSFW',
			args: [
				{
					id: 'tags',
					type: 'string',
					default: 'null',
					match: 'content',
				}],
			description: {
				usage: 'e621 [Tag]',
				examples: ['example', 'example2'],
				description: 'Example.',
			},
		});
	}

	exec(message, args) {
		// eslint-disable-next-line prefer-const
		let e6 = new yiff.e621(config);
		e6.request(args.tags).then(r => console.log(r));

		const embed = new MessageEmbed()
	}
}

module.exports = E621Command;