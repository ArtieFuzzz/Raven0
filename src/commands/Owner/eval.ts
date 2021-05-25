import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { inspect } from 'util'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class EvalCommand extends Command {
	public constructor () {
		super('eval', {
			aliases: ['eval'],
			description: 'Evaluate JavaScript code',
			ownerOnly: true,
			args: [
				{
					id: 'query',
					type: 'string',
					match: 'content'
				}
			]
		})

		this.help = {
			usage: 'eval',
			examples: ['eval this.client']
		}
	}

	public async exec (message: Message, { query }: { query: string}): Promise<Message> {
		const embed = new MessageEmbed()
			.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }))

		const code = (lang: string, code: string) => `\`\`\`${lang}\n${String(code).slice(0, 1000) + (code.length >= 1000 ? '...' : '')}\n\`\`\``.replace(this.client.token, 'Uh oh! I can\'t do that!')

		if (!query) {
			message.channel.send('Please, write something so I can evaluate!')
		}
		else {
			try {
				/* eslint-disable prefer-const, no-eval */
				let evald = eval(query)
				const res = typeof evald === 'string' ? evald : inspect(evald, { depth: 0 })

				embed.addField('Result', code('js', res))

				// eslint-disable-next-line no-mixed-operators
				if (!res || !evald && evald !== 0) {
					embed.setColor('RED')
				}
				else {
					embed
						.addField('Type', code('ts', typeof evald))
						.setColor('GREEN')
				}
			}
			catch (error) {
				embed
					.addField('Error', code('js', error))
					.setColor('RED')
			}
			finally {
				// eslint-disable-next-line no-unsafe-finally
				return await message.channel.send(embed)
			}
		}
	}
}
