import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class IllustrationCommand extends Command {
	public constructor () {
		super('Illustration', {
			aliases: ['Illustration'],
			category: 'Images',
			description: 'Returns a Image from r/Illustration',
			ratelimit: 3
		})

		this.help = {
			usage: 'Illustration',
			examples: ['Illustration']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url, post } = await this.client.ksoft.images.reddit('Illustration', { removeNSFW: true, span: 'day' })
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setTimestamp()
			.setImage(url)
			.setColor('DARK_GREEN')
		return await message.util.send(embed)
	}
}
