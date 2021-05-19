import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class MemeCommand extends Command {
	public constructor () {
		super('meme', {
			aliases: ['meme'],
			category: 'Images',
			description: 'Returns a meme from various subreddits',
			ratelimit: 3
		})

		this.help = {
			usage: 'meme',
			examples: ['memes']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url, post } = await this.client.ksoft.images.meme()
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
