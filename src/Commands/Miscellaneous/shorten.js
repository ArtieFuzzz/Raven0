const { Command } = require('discord-akairo');
const sxcu = require('sxcu.js');

class ShortenCommand extends Command {

	constructor() {
		super('shorten', {
			aliases: ['shorten', 'shortenurl', 'shorturl'],
			category: 'Miscellaneous',
			args: [
				{
					id: 'text',
					type: 'string',
					match: 'content',
				} ],
			description: {
				usage: 'shorten [link]',
				examples: ['shorten https://duckduckgo.com', 'shorturl http://questionable-site.com'],
				description: 'Like hastebin.',
			},
		});
	}

	async exec(message, args) {
		if (!args.text) return message.channel.send('Can\'t create a paste from thin air!');
		try {
			const shortlink = await sxcu.shortenLink(args.text);
			const url = await shortlink.getUrl();
			message.channel.send(`**Done!** ${url}`);
		}
		catch (err) {
			return message.channel.send(err.message);
		}
	}

}

module.exports = ShortenCommand;
