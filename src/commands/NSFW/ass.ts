import { Command } from 'discord-akairo'
import { Message, DMChannel } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class AssCommand extends Command {
	nsfw: boolean
	public constructor () {
		super('ass', {
			aliases: ['ass'],
			category: 'NSFW',
			description: 'Returns an ass Image',
			ratelimit: 3
		})

		this.nsfw = true
		this.help = {
			usage: 'ass',
			examples: ['ass']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url } = await this.client.ksoft.images.random('ass', { nsfw: true })
		const embed = new MessageEmbed()
			.setTitle('Thicc?')
			.setFooter('Powered by api.ksoft.si')
			.setURL(url)
			.setTimestamp()
			.setImage(url)
			.setColor('BLACK')
		return await message.util.send(embed)
	}
}
