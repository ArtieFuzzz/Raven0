import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class CatCommand extends Command {
	public constructor () {
		super('cat', {
			aliases: ['cat'],
			category: 'Images',
			description: 'Returns a cat Image',
			ratelimit: 3
		})

		this.help = {
			usage: 'cat',
			examples: ['cat']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url } = await this.client.ksoft.images.random('cat', { nsfw: false })
		const embed = new MessageEmbed()
			.setTitle('Kitty Kat')
			.setFooter('Powered by api.ksoft.si')
			.setURL(url)
			.setColor('White')
			.setTimestamp()
			.setImage(url)
		return await message.util.send(embed)
	}
}
