import { Command } from 'discord-akairo'
import { Message } from 'discord.js'

export default class PingCommand extends Command {
  public constructor () {
    super('prefix', {
      aliases: ['prefix'],
      category: 'Settings',
      description: 'Set the prefix of the bot',
      userPermissions: ['MANAGE_GUILD'],
      args: [
        {
          id: 'prefix'
        }
      ],
      ratelimit: 2,
      cooldown: 5000,
      channel: 'guild'
    })

    this.help = {
      usage: 'prefix',
      examples: ['prefix']
    }
  }

  public async exec (message: Message, { prefix }: { prefix: string }): Promise<Message> {
    if (prefix === 'get') {
      const pre: string = this.client.settings.get(message.id, 'prefix', process.env.CLIENT_PREFIX)
      return await message.reply(`The prefix set on this server is currently ${pre}`)
    }
    if (prefix === 'clear') {
      await this.client.settings.delete(message.guild.id, 'prefix')
      return await message.reply(`Prefix is back to the default ${process.env.CLIENT_PREFIX}`)
    }
    await this.client.settings.set(message.guild.id, 'prefix', prefix)
    return await message.reply(`Prefix changed to ${prefix}`)
  }
}
