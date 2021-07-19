import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { exec } from 'child_process'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class ExecCommand extends Command {
	public constructor () {
		super('exec', {
			aliases: ['exec'],
			description: 'Execute a command',
			category: 'owner',
			ownerOnly: true,
			args: [
				{
					id: 'cmd',
					type: 'string',
					match: 'content'
				}
			]
		})

		this.help = {
			usage: 'exec <cmd>',
			examples: ['exec whois']
		}
	}

	public async exec (message: Message, { cmd }: { cmd: string}): Promise<any> {
		exec(cmd, async (error, stdout, sterr) => {
			if (stdout.length > 4000) return await message.channel.send('The output was longer than 4000!')
			await message.channel.send('```bash\n' + stdout + '```')
			if (message.guild.me.hasPermission('MANAGE_MESSAGES')) await message.delete()
			// eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-plus-operands
			if (sterr || error) return await message.channel.send('stderr:\n```bash\n' + sterr || error + '```')
		})
	}
}
