import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class KappaCommand extends Command {
	public constructor () {
		super('kappa', {
			aliases: ['kappa'],
			category: 'Images',
			description: 'Returns a kappa Image',
			ratelimit: 3
		})

		this.help = {
			usage: 'kappa',
			examples: ['kappa']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url } = await this.client.ksoft.images.random('kappa', { nsfw: false })
		const embed = new MessageEmbed()
			.setTitle('Kappa!')
			.setFooter('Powered by api.ksoft.si')
			.setURL(url)
			.setColor('White')
			.setTimestamp()
			.setImage(url)
		return await message.util.send(embed)
	}
}
