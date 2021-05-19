import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class UNIXPornCommand extends Command {
	public constructor () {
		super('unixporn', {
			aliases: ['unixporn', 'up'],
			category: 'Images',
			description: 'Returns a Image from r/UNIXporn',
			ratelimit: 3
		})

		this.help = {
			usage: 'unixporn',
			examples: ['unixporn']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url, post } = await this.client.ksoft.images.reddit('UNIXporn', { removeNSFW: true, span: 'day' })
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setTimestamp()
			.setImage(url)
			.setColor('BLACK')
		return await message.util.send(embed)
	}
}
