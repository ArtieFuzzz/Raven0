const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class NoTrapsCommand extends Command {

	constructor() {
		super('notraps', {
			aliases: ['notraps', 'notrap'],
			category: 'NSFW',
			args: [
				{
					id: 'span',
					type: 'string',
					default: 'all',
				} ],
			description: {
				usage: 'notraps <span>',
				examples: ['notraps', 'notraps hour', 'notraps all'],
				description: 'Returns a random NSFW image of a NoTrap image.',
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
		const { url, post } = await ksoft.images.reddit('NoTraps', { span: args.span });
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

module.exports = NoTrapsCommand;
