import { Command } from 'discord-akairo'
import { Message, DMChannel } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class BigTiddyCommand extends Command {
	public constructor () {
		super('notraps', {
			aliases: ['notraps'],
			category: 'NSFW',
			description: 'Returns an Image from r/NoTraps',
			ratelimit: 3
		})

		this.help = {
			usage: 'notraps',
			examples: ['notraps']
		}
	}

	public async exec (message: Message): Promise<Message> {
		if (message.channel instanceof DMChannel) return await message.channel.send('You can\'t use this command in DMs!')
		if (!message.channel.nsfw) return await message.util.send(':x: This command only runs in NSFW channels')

		const { url, post } = await this.client.ksoft.images.reddit('notraps', { span: 'day', removeNSFW: false })
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setColor('PINK')
			.setTimestamp()
			.setImage(url)
		return await message.util.send(embed)
	}
}
