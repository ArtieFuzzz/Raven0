import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'
import Yiff from 'yiff'
import { yiffConfig } from '../../lib/config'
import { YiffStruct } from '../../lib/interfaces'

export default class E621Command extends Command {
	nsfw: boolean
	public constructor () {
		super('e621', {
			aliases: ['e621'],
			category: 'NSFW',
			description: 'Returns an Image from e621 with your selected tags',
			ratelimit: 3,
			args: [
				{
					id: 'Tags',
					type: 'string',
					match: 'content'
				}
			]
		})

		this.nsfw = true
		this.help = {
			usage: 'e621',
			examples: ['e621']
		}
	}

	public async exec (message: Message, { Tags }: { Tags: string}): Promise<Message> {
		const yiff = new Yiff(yiffConfig)

		try {
			if (!Tags) return await message.channel.send('No tags were specified')
			const req: YiffStruct = await yiff.e621(Tags, 1)

			const embed = new MessageEmbed()
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				.setDescription(`\`[[link](https://e621.net/post/${req[0].id})]\``)
				.setImage(req[0].file.url)
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				.setFooter(`Artist(s): ${req[0].tags.artist} | Ups: ${req[0].score.up} | Downs ${req[0].score.down} | Total Score: ${req[0].score.total}`)
				.setColor('RANDOM')
			return await message.util.send(embed)
		}
		catch (e) {
			return await message.channel.send(e.message)
		}
	}
}
