import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class FoodPornCommand extends Command {
	public constructor () {
		super('foodporn', {
			aliases: ['foodporn', 'fp'],
			category: 'Images',
			description: 'Returns a Image from r/foodporn',
			ratelimit: 3
		})

		this.help = {
			usage: 'foodporn',
			examples: ['foodporn']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url, post } = await this.client.ksoft.images.reddit('foodporn', { removeNSFW: true, span: 'day' })
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setTimestamp()
			.setImage(url)
			.setColor('ORANGE')
		return await message.util.send(embed)
	}
}
