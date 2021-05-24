import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class AwwCommand extends Command {
	public constructor () {
		super('aww', {
			aliases: ['aww'],
			category: 'Images',
			description: 'Returns a cute Image',
			ratelimit: 3
		})

		this.help = {
			usage: 'aww',
			examples: ['aww']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url, post } = await this.client.ksoft.images.aww()
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setTimestamp()
			.setImage(url)
			.setColor('PINK')
		return await message.util.send(embed)
	}
}
