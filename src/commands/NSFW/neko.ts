import { Command } from 'discord-akairo'
import { Message, DMChannel } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class AssCommand extends Command {
	nsfw: boolean
	public constructor () {
		super('neko', {
			aliases: ['neko'],
			category: 'NSFW',
			description: 'Returns an neko Image',
			ratelimit: 3
		})

		this.nsfw = true
		this.help = {
			usage: 'ass',
			examples: ['ass']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url } = await this.client.ksoft.images.random('neko', { nsfw: true })
		const embed = new MessageEmbed()
			.setTitle('Uhh...')
			.setFooter('Powered by api.ksoft.si')
			.setURL(url)
			.setTimestamp()
			.setImage(url)
			.setColor('WHITE')
		return await message.util.send(embed)
	}
}
