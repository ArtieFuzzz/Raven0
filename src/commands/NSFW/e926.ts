import { Command } from 'discord-akairo'
import { Message, DMChannel } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'
import * as Yiff from 'yiff'

export default class E926Command extends Command {
	nsfw: boolean
	public constructor () {
		super('e926', {
			aliases: ['e926'],
			category: 'NSFW',
			description: 'Returns an Image from e926 with your selected tags',
			ratelimit: 3,
			args: [
				{
					id: 'tags',
					type: 'string',
					match: 'content'
				}
			]
		})

		this.nsfw = true
		this.help = {
			usage: 'e926',
			examples: ['e926']
		}
	}

	public async exec (message: Message, { tags }: { tags: string}): Promise<Message> {
		try {
			// eslint-disable-next-line new-cap
			const e9 = new Yiff.e926({
				creator: 'ArtieFuzzz#8298',
				name: 'Raven0',
				version: '1.0'
			})
			if (!tags) return await message.channel.send('No tags were specified')
			const { image, page, artist }: { image?: string, page: string, artist?: string[] } = await e9.request(tags)

			const embed = new MessageEmbed()
				.setTitle('Source')
				.setURL(page)
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				.setFooter(`Artist(s): ${artist}`)
				.setImage(image)
				.setColor('RANDOM')
			return await message.util.send(embed)
		}
		catch (e) {
			return await message.channel.send(e.message)
		}
	}
}
