import { Listener } from 'discord-akairo'
import { Message } from 'discord.js'
import User from '../lib/models/User'

export default class CooldownListener extends Listener {
	constructor () {
		super('CommandUsed', {
			emitter: 'commandHandler',
			event: 'commandStarted'
		})
	}

	public async exec (message: Message): Promise<any> {
		const _userID = message.author.id
		return await User.findOneAndUpdate({ userID: _userID }, { $inc: { commandsRan: 1 } })
	}
}
