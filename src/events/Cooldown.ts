import { Listener, Command } from 'discord-akairo'
import { Message } from 'discord.js'
// import { MessageEmbed } from '../../structures/MessageEmbed'

export default class CooldownListener extends Listener {
	constructor () {
		super('cooldown', {
			emitter: 'commandHandler',
			event: 'cooldown'
		})
	}

	public async exec (message: Message, command: Command, remaining: any): Promise<Message> {
		/* const embed = new MessageEmbed()
      .setColor('RED')
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
      .setDescription(`⚙️ You are on a cooldown for the command: \`${command}\`. Please wait: \`${remaining.toFixed(2) / 1000}s\``)
    return await message.channel.send({ embed }) */
		return await message.util.reply(`Slow down! Wait \`${remaining.toFixed(2) / 1000}s\`s`)
	}
}
