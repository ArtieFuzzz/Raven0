import { Command } from 'discord-akairo'
import { Message, DMChannel } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class HentaiGifCommand extends Command {
	nsfw: boolean
	public constructor () {
		super('randnsfw', {
			aliases: ['randnsfw', 'nsfw'],
			category: 'NSFW',
			description: 'Returns a random NSFW Image',
			ratelimit: 3
		})

		this.nsfw = true
		this.help = {
			usage: 'randnsfw',
			examples: ['randnsfw']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url, post } = await this.client.ksoft.images.nsfw(false)
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setColor('RANDOM')
			.setTimestamp()
			.setImage(url)
		return await message.util.send(embed)
	}
}
