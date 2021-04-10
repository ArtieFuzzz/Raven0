const { Command } = require('klasa');
const sxcu = require('sxcu.js');

class ShortenCommand extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['shortenurl', 'shorturl'],
			usage: '[url:string]',
		});
	}

	async run(message, [link]) {
		try {
			const shortlink = await sxcu.shortenLink(link);
			const url = await shortlink.getUrl();
			message.channel.send(`**Done!** ${url}`);
		}
		catch (err) {
			return message.channel.send(err.message);
		}
	}

}

module.exports = ShortenCommand;
