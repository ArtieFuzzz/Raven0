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
					id: 'op',
					type: 'string',
					match: 'separate'
				},
				{
					id: 'str',
					type: 'string',
					match: 'content'
				}
			]
		})

		this.help = {
			usage: 'binary <encode | decode> <text>',
			examples: ['binary encode computers are cool :)']
		}
	}

	public async exec (message: Message, { op, str }: { op: string, str: string}): Promise<Message> {
		if (op[0].toLowerCase() === 'encode') return await this.Encode(message, { op, str })
		if (op[0].toLowerCase() === 'decode') return await this.Decode(message, { op, str })
		else {
			return await message.reply('Options: Encode | Decode')
		}
	}

	private async Encode (message: Message, { op, str }: { op: string, str: string}) {
		const res = await c(`https://some-random-api.ml/binary?text=${str.slice(op[0].length)}`).send()
		const { binary } = res.json

		return await message.channel.send(binary)
	}

	private async Decode (message: Message, { op, str }: { op: string, str: string}) {
		const res = await c(`https://some-random-api.ml/binary?decode=${str.slice(op[0].length)}`).send()
		const { text } = res.json

		return await message.channel.send(text)
	}
}
