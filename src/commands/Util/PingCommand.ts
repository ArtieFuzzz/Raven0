import { Command } from 'discord-akairo'
import { Message } from 'discord.js'

export default class PingCommand extends Command {
	public constructor () {
		super('ping', {
			aliases: ['ping'],
			category: 'Util',
			description: 'Check latency',
			ratelimit: 3
		})

		this.help = {
			usage: 'ping',
			examples: ['ping']
		}
	}

	public async exec (message: Message): Promise<Message> {
		const sent = await message.util.reply('Pong!')
		// @ts-expect-error
		const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt)
		return await message.util.reply(`Pong!\n🔂 **RTT**: ${timeDiff} ms\n💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`)
	}
}
