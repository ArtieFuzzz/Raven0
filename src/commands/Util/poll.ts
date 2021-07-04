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
					id: 'title',
					match: 'content',
					type: 'string',
					prompt: {
						start: 'What will the title be of this poll?'
					}
				},
				{
					id: 'str',
					match: 'content',
					type: 'string',
					description: 'Message',
					prompt: {
						start: 'What will the content be of this poll?'
					}
				},
				{
					id: 'arg',
					type: 'string',
					match: 'content'
				}
			]
		})

		this.help = {
			usage: 'poll <message>',
			examples: ['poll']
		}
	}

	public async exec (message: Message, { str, title, arg }: { title: string, str: string, arg: string }): Promise<void> {
		const args = arg.split(',')
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
