import { Inhibitor } from 'discord-akairo'
import { Message } from 'discord.js'
import { getUser } from '../lib/Mongo'

export default class UserBlacklist extends Inhibitor {
	constructor () {
		super('userBlacklist', {
			reason: 'blacklisted',
			priority: 1,
			category: 'blacklists'
		})
	}

	public async exec (message: Message): Promise<any> {
		let User = await getUser(message.author.id)

		if (User.blacklisted) return await message.util.reply('You are blacklisted from using this bot')
	}
}
