import { Command } from 'discord-akairo'
import { Message, DMChannel } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'
import * as Yiff from 'yiff'

export default class E621Command extends Command {
	public constructor () {
		super('e621', {
			aliases: ['e621'],
			category: 'NSFW',
			description: 'Returns an Image from e621 with your selected tags',
			ratelimit: 3,
			args: [
				{
					id: 'tags',
					type: 'string',
					match: 'content'
				}
			]
		})

		this.help = {
			usage: 'e621',
			examples: ['e621']
		}
	}

	public async exec (message: Message, { tags }: { tags: string}): Promise<Message> {
		if (message.channel instanceof DMChannel) return await message.channel.send('You can\'t use this command in DMs!')
		if (!message.channel.nsfw) return await message.util.send(':x: This command only runs in NSFW channels')

		try {
			// eslint-disable-next-line new-cap
			const e6 = new Yiff.e621({
				creator: 'ArtieFuzzz#8298',
				name: 'Raven0',
				version: '1.0'
			})
			if (!tags) return await message.channel.send('No tags were specified')
			const { image, page, artist }: { image?: string, page: string, artist?: string[] } = await e6.request(tags)

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
