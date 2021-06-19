import { Command } from 'discord-akairo'
import { Message, DMChannel } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class HentaiGifCommand extends Command {
	nsfw: boolean
	public constructor () {
		super('hentaigif', {
			aliases: ['hentaigif', 'hg'],
			category: 'NSFW',
			description: 'Returns an hentai Gif',
			ratelimit: 3
		})

		this.nsfw = true
		this.help = {
			usage: 'hentaigif',
			examples: ['hentaigif']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const { url } = await this.client.ksoft.images.random('hentai_gif', { nsfw: true })
		const embed = new MessageEmbed()
			.setTitle('Hentaii!!')
			.setFooter('Powered by api.ksoft.si')
			.setURL(url)
			.setTimestamp()
			.setImage(url)
			.setColor('PINK')
		return await message.util.send(embed)
	}
}
