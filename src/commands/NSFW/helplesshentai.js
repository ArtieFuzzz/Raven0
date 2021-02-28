const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class HentaiHelplessCommand extends Command {
	constructor() {
		super('helplesshentai', {
			aliases: ['helplesshentai', 'hhentai'],
			category: 'NSFW',
			args: [
				{
					id: 'span',
					type: 'string',
					default: 'day',
				}],
			description: {
				usage: 'helplesshentai <span>',
				examples: ['helplesshentai', 'hhentai', 'hhentai year', 'hhentai month', 'hhentai all'],
				description: 'Returns a random NSFW image of helplesshentai.',
			},
		});
	}

	async exec(message, args) {
		if (!message.guild) return true;
		if (!message.channel.nsfw) {
			message.util.send(':x: This command only runs in NSFW channels');
			return true;
		}
		const { url, post } = await ksoft.images.reddit('helplesshentai', { span: args.span });
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setColor('RANDOM')
			.setTimestamp()
			.setImage(url);
		message.channel.send(embed);
	}
}

module.exports = HentaiHelplessCommand;