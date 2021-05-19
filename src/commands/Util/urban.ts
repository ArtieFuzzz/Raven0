import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'
import * as c from '@aero/centra'

export default class UrbanCommand extends Command {
	public constructor () {
		super('urban', {
			aliases: ['urban', 'ub'],
			category: 'Util',
			description: 'Search something up on the Trusty Urban Dictionary',
			ratelimit: 3,
			args: [
				{
					id: 'search',
					type: 'string',
					match: 'content',
					description: 'Your search'
				}
			]
		})

		this.help = {
			usage: 'urban',
			examples: ['urban code']
		}
	}

	public async exec (message: Message, { search }: { search: string }): Promise<Message> {
		try {
			const res = await c(`https://api.urbandictionary.com/v0/define?term=${search}`).send()
			const { list } = await res.json
			const embed = new MessageEmbed()
				.setTitle(list[0].word)
				.setDescription(list[0].definition)
				.addField('Example', list[0].example)
				.setURL(list[0].permalink)
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				.setFooter(`Author: ${list[0].author} | ID: ${list[0].defid} | Upvotes: ${list[0].thumbs_up} | Downvotes: ${list[0].thumbs_down}`)
			message.channel.send(embed)
		}
		catch (err) {
			return await message.channel.send(err.message)
		}
	}
}
