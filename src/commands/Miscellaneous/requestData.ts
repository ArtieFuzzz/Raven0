import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { getUser } from '../../lib/Mongo'

export default class RequestDataCommand extends Command {
	public constructor () {
		super('requestData', {
			aliases: ['requestData'],
			category: 'Miscellaneous',
			description: 'Request your data from the database',
			ratelimit: 2,
			cooldown: 1000
		})
		this.help = {
			usage: 'requestData',
			examples: ['requestData']
		}
	}

	public async exec (message: Message): Promise<Message> {
		interface Data {
			userID: number
			registeredAt: number
			blacklist: boolean
			commandsRan: number
		}
		const data: Data = await getUser(message.author.id)

		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		return await message.author.send(`userID: ${data.userID}\nregisteredAt: ${data.registeredAt}\nblacklisted: ${data.blacklist}\ncommandsRan: ${data.commandsRan}`)
	}
}
