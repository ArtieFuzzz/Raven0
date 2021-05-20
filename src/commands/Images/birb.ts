import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class BirbCommand extends Command {
	public constructor () {
		super('birb', {
			aliases: ['birb', 'bird'],
			category: 'Images',
			description: 'Returns a birb (bird) Image',
			ratelimit: 3
		})

		this.help = {
			usage: 'birb',
			examples: ['birb', 'bird']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url } = await this.client.ksoft.images.random('birb', { nsfw: false })
		const embed = new MessageEmbed()
			.setTitle('Birb')
			.setFooter('Powered by api.ksoft.si')
			.setURL(url)
			.setColor('LIME')
			.setTimestamp()
			.setImage(url)
		return await message.util.send(embed)
	}
}
