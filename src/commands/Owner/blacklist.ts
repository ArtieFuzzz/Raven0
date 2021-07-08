import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import Guild from '../../lib/models/Guild'
import User from '../../lib/models/User'
import { getUser, getGuild } from '../../lib/Mongo'
import config from '../../config'

export default class BlacklistCommand extends Command {
	public constructor () {
		super('blacklist', {
			aliases: ['blacklist'],
			description: 'Blacklist a user / guild',
			category: 'owner',
			ownerOnly: true,
			args: [
				{
					id: 'id',
					type: 'string',
					match: 'rest'
				},
				{
					id: 'guildFlag',
					type: 'flag',
					match: 'flag',
					flag: ['-g', '--guild']
				},
				{
					id: 'userFlag',
					type: 'flag',
					match: 'flag',
					flag: ['-u', '--user']
				}
			]
		})

		this.help = {
			usage: 'blacklist <-u --user | -g --guild> <ID>',
			examples: ['blacklist -u 389252140184633363']
		}
	}

	public async exec (message: Message, { id, guildFlag, userFlag }: { id: string, guildFlag: boolean, userFlag: boolean}): Promise<Message> {
		if (userFlag) return await this.User(message, id)
		if (guildFlag) return await this.Guild(message, id)
		return await message.reply(`${config.prefix}blacklist <-u --user | -g --guild> <ID>`)
	}

	private async User (message: Message, id: string): Promise<Message> {
		const user = this.client.users.cache.get(id)
		if (!user) {
			return await message.channel.send('Cannot find user')
		}
		const userData = await getUser(user.id)

		if (userData.blacklisted) {
			await User.findOneAndUpdate({ userID: user.id }, { blacklisted: false })
			return await message.channel.send(`${user.tag} Was unblacklisted`)
		}
		if (!userData.blacklisted) {
			await User.findOneAndUpdate({ userID: user.id }, { blacklisted: true })
			return await message.channel.send(`${user.tag} Was blacklisted`)
		}
	}

	private async Guild (message: Message, id: string): Promise<Message> {
		const guild = this.client.guilds.cache.get(id)

		if (!guild) {
			return await message.channel.send('Cannot find user')
		}
		const guildData = await getGuild(guild.id)

		if (guildData.blacklisted) {
			await Guild.findOneAndUpdate({ guildID: guild.id }, { blacklisted: false })
			return await message.channel.send(`${guild.name} (${guild.id}) Was unblacklisted`)
		}
		if (!guildData.blacklisted) {
			await Guild.findOneAndUpdate({ guildID: guild.id }, { blacklisted: true })
			return await message.channel.send(`${guild.name} (${guild.id}) Was blacklisted`)
		}
	}
}
