import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class AstroPhotographyCommand extends Command {
	public constructor () {
		super('astrophotography', {
			aliases: ['astronomy', 'astrophotography'],
			category: 'Images',
			description: 'Returns a Image from r/astrophotography',
			ratelimit: 3
		})

		this.help = {
			usage: 'astronomy',
			examples: ['astronomy', 'astrophotography']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url, post } = await this.client.ksoft.images.reddit('astrophotography', { removeNSFW: true, span: 'day' })
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
