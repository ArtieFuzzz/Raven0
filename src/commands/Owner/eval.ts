import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { inspect } from 'util'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'
import { WebhookLogger } from '../../lib/structures/WebhookLogger'

export default class EvalCommand extends Command {
	logger: WebhookLogger
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
				},
				{
					id: 'depthOption',
					type: 'string',
					match: 'option',
					flag: ['-d', '--depth']
				},
				{
					id: 'asyncFlag',
					type: 'flag',
					match: 'flag',
					flag: ['-a', '--async']
				}
			]
		})
		this.logger = WebhookLogger.instance

		this.help = {
			usage: 'eval [-s --silent || -d -depth <number> || -a --async] <js>',
			examples: ['eval this.client', 'eval --silent message.channel(\'No output\')']
		}
	}

	public async exec (message: Message, { expression, silentFlag, depthOption, asyncFlag }: { expression: string, silentFlag: boolean, depthOption: string, asyncFlag: boolean, logFlag: boolean}): Promise<Message> {
		if (!expression) return await message.channel.send('I have nothing to evaluate!')
		return await this.eval(message, expression, depthOption, asyncFlag, silentFlag)
	}

	private async eval (message: Message, expression: string, depthOption?: string, asyncFlag?: boolean, silentFlag?: boolean): Promise<Message> {
		const embed = new MessageEmbed()
			.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }))

		let output: string, type: string
		try {
			if (asyncFlag) expression = `(async () => {\n${expression}\n})()`
			// eslint-disable-next-line no-eval
			output = eval(expression)
			type = typeof output

			embed.setTitle('Success! | Result')
			embed.setColor('GREEN')
			embed.addField('Output:', `\`\`\`js\n${output}\`\`\``)
			embed.addField('Type:', `\`\`\`ts\n${type}\`\`\``)
		}
		catch (err) {
			if (!type) type = typeof err
			// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
			if (err && err.stack) this.logger.error('[Eval] ERROR!:', err.stack)

			embed.setTitle('Error! | Result')
			embed.setColor('RED')
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			embed.addField('Output:', `\`\`\`js\n${err.message}\`\`\``)
			embed.addField('Type:', `\`\`\`ts\n${type}\`\`\``)
		}
		if (typeof output !== 'string') {
			output = inspect(output, {
				depth: depthOption ? parseInt(depthOption) || 0 : 0
			})
		}
		if (silentFlag) return null
		return await message.channel.send(embed)
	}
}
