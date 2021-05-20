import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class DogCommand extends Command {
	public constructor () {
		super('dog', {
			aliases: ['dog', 'doggo'],
			category: 'Images',
			description: 'Returns a dog Image',
			ratelimit: 3
		})

		this.help = {
			usage: 'dog',
			examples: ['dog', 'doggo']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url } = await this.client.ksoft.images.random('dog', { nsfw: false })
		const embed = new MessageEmbed()
			.setTitle('Dogs!')
			.setFooter('Powered by api.ksoft.si')
			.setURL(url)
			.setColor('White')
			.setTimestamp()
			.setImage(url)
		return await message.util.send(embed)
	}
}
