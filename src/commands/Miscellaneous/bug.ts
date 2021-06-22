import { Command } from 'discord-akairo'
import { Message, TextChannel } from 'discord.js'
import { MessageEmbed } from '../../lib/structures/MessageEmbed'

export default class BugReportCommand extends Command {
	public constructor () {
		super('bug', {
			aliases: ['bug'],
			category: 'Miscellaneous',
			description: 'Report a bug',
			ratelimit: 1,
			cooldown: 5000,
			args: [
				{
					id: 'report',
					type: 'string',
					match: 'content'
				}
			]
		})

		this.help = {
			usage: 'bug <string>',
			examples: ['bug discord bot crashed after 10 seconds']
		}
	}

	public async exec (message: Message, { report }: { report: string}): Promise<Message> {
		if (!report) return await message.channel.send('You can\'t send an empty report!')

		const Channel = this.client.channels.cache.get('856027153657495562') as TextChannel

		const embed = new MessageEmbed()
			.setTitle(`**New bug report by ${message.author.tag} (${message.author.id})**`)
			.setDescription(`\`${report}\``)
			.setTimestamp()
			.setFooter(`Guild > ${message.guild.name} (${message.guild.id})`, message.author.avatarURL())
		await Channel.send(embed)

		return await message.channel.send('Your bug report has been successfully sent')
	}
}
