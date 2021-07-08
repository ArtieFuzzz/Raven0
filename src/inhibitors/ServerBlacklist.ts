import { Inhibitor } from 'discord-akairo'
import { Message } from 'discord.js'
import { getGuild } from '../lib/Mongo'

export default class ServerBlacklist extends Inhibitor {
	constructor () {
		super('serverBlacklist', {
			reason: 'blacklisted',
			priority: 1,
			category: 'blacklists'
		})
	}

	public async exec (message: Message): Promise<any> {
		let Guild = await getGuild(message.guild.id)

		if (Guild.blacklisted) return await message.util.reply('This server is blacklisted')
	}
}
