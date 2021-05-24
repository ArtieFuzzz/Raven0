import { Command } from 'discord-akairo'
import { Message } from 'discord.js'

export default class AdviceCommand extends Command {
	public constructor () {
		super('advice', {
			aliases: ['advice'],
			category: 'Util',
			description: 'Get some advice',
			ratelimit: 3
		})

		this.help = {
			usage: 'advice',
			examples: ['advice']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const Data = await this.client.srod.GetAdvice({ Color: 'BLUE' })
		return await message.channel.send(Data)
	}
}
