import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import * as owoifyx from 'owoifyx'

export default class OwOifyCommand extends Command {
	public constructor () {
		super('owoify', {
			aliases: ['owoify', 'owoifyx'],
			category: 'Miscellaneous',
			description: 'OwOify a string',
			ratelimit: 3,
			args: [
				{
					id: 'str',
					type: 'string',
					match: 'content',
					description: 'String to owoify'
				}
			]
		})
		this.help = {
			usage: 'owoify',
			examples: ['owoify <string>']
		}
	}

	public async exec (message: Message, { str }: { str: string }): Promise<Message> {
		return await message.channel.send(owoifyx(str))
	}
}
