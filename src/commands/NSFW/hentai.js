const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class HentaiCommand extends Command {

	constructor() {
		super('hentai', {
			aliases: ['hentai'],
			category: 'NSFW',
			args: [
				{
					id: 'span',
					type: 'string',
					default: 'day'
				} ],
			description: {
				usage: 'hentai <span>',
				examples: ['hentai', 'hentai hour', 'hentai all'],
				description: 'Returns a random NSFW image of hentai.'
			},
			ratelimit: '3',
			cooldown: '3000'
		});
	}

	async exec(message, args) {
		if (!message.guild) return true;
		if (!message.channel.nsfw) {
			message.util.send(':x: This command only runs in NSFW channels');
			return true;
		}
		const { url, post } = await ksoft.images.reddit('hentai', { span: args.span });
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

module.exports = HentaiCommand;
