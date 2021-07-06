import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import c from '@aero/centra'

export default class BinaryCommand extends Command {
	public constructor () {
		super('binary', {
			aliases: ['binary'],
			category: 'Util',
			description: 'Encode or decode to or from binary',
			ratelimit: 2,
			cooldown: 5000,
			args: [
				{
					id: 'str',
					type: 'string',
					match: 'rest'
				},
				{
					id: 'encodeFlag',
					match: 'flag',
					type: 'flag',
					flag: ['-e', '--encode']
				},
				{
					id: 'decodeFlag',
					match: 'flag',
					type: 'flag',
					flag: ['-d', '--decode']
				}
			]
		})

		this.help = {
			usage: 'binary <-e --encode | -d --decode> <text>',
			examples: ['binary -e computers are cool :)']
		}
	}

	public async exec (message: Message, { str, encodeFlag, decodeFlag }: { str: string, encodeFlag: boolean, decodeFlag: boolean }): Promise<Message> {
		if (encodeFlag) return await this.Encode(message, str)
		if (decodeFlag) return await this.Decode(message, str)
		else {
			return await message.reply('Options / Flags: -e --encode | -d --decode')
		}
	}

	private async Encode (message: Message, str: string) {
		const res = await c(`https://some-random-api.ml/binary?text=${str}`).send()
		const { binary } = res.json

		return await message.channel.send(binary)
	}

	private async Decode (message: Message, str: string) {
		const res = await c(`https://some-random-api.ml/binary?decode=${str}`).send()
		const { text } = res.json

		return await message.channel.send(text)
	}
}
