/**
 * TODO
 **/
import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import Guild from '../../lib/models/Guild'
import User from '../../lib/models/User'
import { getUser, getGuild } from '../../lib/Mongo'

export default class BlacklistCommand extends Command {
	public constructor () {
		super('blacklist', {
			aliases: ['blacklist'],
			description: 'Blacklist a user / guild',
			category: 'owner',
			ownerOnly: true,
			args: [
				{
					id: 'op',
					type: 'string',
					match: 'separate'
				},
				{
					id: 'id',
					type: 'string',
					match: 'content'
				}
			]
		})

		this.help = {
			usage: 'blacklist <user | guild>',
			examples: ['blacklist']
		}
	}

	public async exec (message: Message, { op, id }: { op: string, id: string }): Promise<Message> {
		if (op[0].toLowerCase() === 'user') return await this.User(message, id.slice(op[0].length).trim())
		if (op[0].toLowerCase() === 'guild') return await this.Guild(message, id.slice(op[0].length).trim())
		else {
			return await message.reply('Options: User | Guild')
		}
	}

	private async User (message: Message, id: string): Promise<Message> {
		const user = this.client.users.cache.get(id)
		if (!user) {
			return await message.channel.send('Cannot find user')
		}
		const userData = await getUser(user.id)

		if (userData.data.blacklisted) {
			await User.findOneAndUpdate({ userID: user.id }, { data: { blacklisted: false } })
			return await message.channel.send(`${user.tag} Was unblacklisted`)
		}
		if (!userData.data.blacklisted) {
			await User.findOneAndUpdate({ userID: user.id }, { data: { blacklisted: true } })
			return await message.channel.send(`${user.tag} Was blacklisted`)
		}
	}

	private async Guild (message: Message, id: string): Promise<Message> {
		const guild = this.client.guilds.cache.get(id)

		if (!guild) {
			return await message.channel.send('Cannot find user')
		}
		const guildData = await getGuild(guild.id)

		if (guildData.data.blacklisted) {
			await User.findOneAndUpdate({ guildID: guild.id }, { data: { blacklisted: false } })
			return await message.channel.send(`${guild.name} (${guild.id}) Was unblacklisted`)
		}
		if (!guildData.data.blacklisted) {
			await User.findOneAndUpdate({ guildID: guild.id }, { data: { blacklisted: true } })
			return await message.channel.send(`${guild.name} (${guild.id})} Was blacklisted`)
		}
	}
}
