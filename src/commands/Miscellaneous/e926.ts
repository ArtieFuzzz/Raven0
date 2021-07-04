import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'
import Yiff from '../../lib/util/yiff'
import { YiffStruct } from '../../lib/interfaces'

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
					id: 'Tags',
					type: 'string',
					match: 'content'
				}
			]
		})

		this.nsfw = false
		this.help = {
			usage: 'e926',
			examples: ['e926']
		}
	}

	public async exec (message: Message, { Tags }: { Tags: string}): Promise<Message> {
		try {
			if (!Tags) return await message.channel.send('No tags were specified')
			const req: YiffStruct = await Yiff.e926(Tags, 1)

			const embed = new MessageEmbed()
				.setTitle('Source')
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				.setURL(`https://e926.net/posts/${req[0].id}`)
				.setImage(req[0].file.url)
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				.setFooter(`Artist(s): ${req[0].tags.artist} | Ups: ${req[0].score.up} | Downs ${req[0].score.down} | Total Score: ${req[0].score.total}`)
				.setColor('RANDOM')
			// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
			if (req[0].tags.lore.length > 0) embed.setDescription('`[LORE]`' + req[0].tags.lore)

			return await message.util.send(embed)
		}
		catch (e) {
			return await message.channel.send(e.message)
		}
	}
}
