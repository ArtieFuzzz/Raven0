import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { inspect } from 'util'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class EvalCommand extends Command {
	public constructor () {
		super('eval', {
			aliases: ['eval'],
			description: 'Evaluate JavaScript code',
			category: 'owner',
			ownerOnly: true,
			args: [
				{
					id: 'expression',
					type: 'string',
					match: 'rest'
				},
				{
					id: 'silentFlag',
					type: 'flag',
					match: 'flag',
					flag: ['-s', '--silent']
				}
			]
		})

		this.help = {
			usage: 'eval [-s --silent] <js>',
			examples: ['eval this.client', 'eval --silent message.channel(\'No output\')']
		}
	}

	public async exec (message: Message, { expression, silentFlag }: { expression: string, silentFlag: boolean }): Promise<Message> {
		const embed = new MessageEmbed()
			.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }))

		const code = (lang: string, code: string) => `\`\`\`${lang}\n${String(code).slice(0, 1000) + (code.length >= 1000 ? '...' : '')}\n\`\`\``.replace(this.client.token, 'Uh oh! I can\'t do that!')

		if (!expression) {
			message.channel.send('Please, write something so I can evaluate!')
		}
		else {
			try {
				/* eslint-disable prefer-const, no-eval */
				let evald = eval(expression)
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
				/* eslint-disable no-unsafe-finally */
				if (silentFlag) return null
				return await message.channel.send(embed)
			}
		}
	}
}
