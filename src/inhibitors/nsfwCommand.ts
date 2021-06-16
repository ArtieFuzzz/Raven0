import { Inhibitor, Command } from 'discord-akairo'
import { Message, DMChannel } from 'discord.js'

export default class NSFWCommand extends Inhibitor {
	constructor () {
		super('NSFWCommand', {
			priority: 1,
			category: 'Commands'
		})
	}

	public async exec (message: Message, command: Command): Promise<any> {
		if (command.nsfw) {
			if (message.channel instanceof DMChannel) return await message.channel.send('You can\'t use this command in DMs!')
			if (!message.channel.nsfw) return await message.util.send(':x: This command only runs in NSFW channels')
		}
	}
}
