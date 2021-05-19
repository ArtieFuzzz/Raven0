import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class EightBallCommand extends Command {
	public constructor () {
		super('8ball', {
			aliases: ['8ball'],
			category: 'Miscellaneous',
			description: 'Ask the 8ball a question',
			ratelimit: 3,
			args: [
				{
					id: 'question',
					type: 'string',
					description: 'The question you ask the 8ball'
				}
			]
		})

		this.help = {
			usage: '8ball',
			examples: ['8ball Am I good at coding?']
		}
	}

	public async exec (message: Message, { question }: { question: string}): Promise<Message> {
		const Responses = ['Yes', 'No', 'Maybe', 'Probably', 'Not Sure', 'Definitely', 'Certainly', 'Definitely not', 'Certainly not', 'Sure', 'Nope!', '...', '???', '!!!', 'Say again']; const Random = Responses[Math.floor(Math.random() * Responses.length)]

		if (!question) return await message.channel.send('You didn\'t ask a question or anything...')
		const Embed = new MessageEmbed()
			.setTitle('The 8ball says...')
			.setColor('RANDOM')
			.setDescription(Random)
			.setFooter(`Requested By ${message.author.username}`)
			.setTimestamp()

		return await message.channel.send(Embed)
	}
}
