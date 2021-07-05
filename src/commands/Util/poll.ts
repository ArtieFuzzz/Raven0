import { Command, Argument } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class AdviceCommand extends Command {
	public constructor () {
		super('poll', {
			aliases: ['poll'],
			category: 'Util',
			description: 'Make a poll',
			ratelimit: 3,
			cooldown: 2000,
			args: [
				{
					id: 'arg',
					type: 'string',
					match: 'content'
				}
			]
		})

		this.help = {
			usage: 'poll <title | content>',
			examples: ['poll Good bot? | Thumbs up for yes Thumbs down for no']
		}
	}

	public async exec (message: Message, { arg }: { arg: string }): Promise<void> {
		const args = arg.split('|')
		message.delete()
		const poll = new MessageEmbed()
			.setDescription(args[1])
			.setFooter(message.author.tag, message.author.avatarURL())
			.setTitle('Poll!')

		if (args[0]) poll.setTitle(args[0])

		const embed = await message.channel.send(poll)
		embed.react('👍')
		embed.react('👎')
	}
}
