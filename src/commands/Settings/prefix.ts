import { Command } from 'discord-akairo'
import { Message, Snowflake } from 'discord.js'

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
    const id: Snowflake = message.guild.id

    if (prefix === 'get') {
      const pre: string = this.client.guildSettings.get(id, 'prefix', process.env.CLIENT_PREFIX)
      return await message.reply(`The prefix set on this server is currently ${pre}`)
    }
    if (prefix === 'clear') {
      await this.client.guildSettings.delete(id, 'prefix')
      return await message.reply(`Prefix is back to the default ${process.env.CLIENT_PREFIX}`)
    }
    if (!prefix) {
      const pre: string = this.client.guildSettings.get(id, 'prefix', process.env.CLIENT_PREFIX)
      return await message.reply(`The prefix set on this server is currently ${pre}`)
    }
    await this.client.guildSettings.set(id, 'prefix', prefix)
    return await message.reply(`Prefix changed to ${prefix}`)
  }
}
