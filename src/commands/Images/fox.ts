import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class FoxCommand extends Command {
	public constructor () {
		super('fox', {
			aliases: ['fox'],
			category: 'Images',
			description: 'Returns a fox Image',
			ratelimit: 3
		})

		this.help = {
			usage: 'fox',
			examples: ['fox']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url } = await this.client.ksoft.images.random('fox', { nsfw: false })
		const embed = new MessageEmbed()
			.setTitle('Foxx!')
			.setFooter('Powered by api.ksoft.si')
			.setURL(url)
			.setColor('ORANGE')
			.setTimestamp()
			.setImage(url)
		return await message.util.send(embed)
	}
}
