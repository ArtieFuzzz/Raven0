import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class ComicsCommand extends Command {
	public constructor () {
		super('comics', {
			aliases: ['comics', 'comic'],
			category: 'Images',
			description: 'Returns a Image from r/comics',
			ratelimit: 3
		})

		this.help = {
			usage: 'comics',
			examples: ['comics', 'comic']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url, post } = await this.client.ksoft.images.reddit('comics', { removeNSFW: true, span: 'day' })
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setTimestamp()
			.setImage(url)
			.setColor('WHITE')
		return await message.util.send(embed)
	}
}
