import { Command, version as AkaiVer } from 'discord-akairo'
import { Message, version as DiscVer } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'
import * as typescript from 'typescript'
import config from '../../config'

export default class AdviceCommand extends Command {
  public constructor () {
    super('stats', {
      aliases: ['stats'],
      category: 'Util',
      description: 'The bot stats',
      ratelimit: 3,
      cooldown: 2000
    })

    this.help = {
      usage: 'stats',
      examples: ['stats']
    }
  }

  public async exec (message: Message): Promise<Message> {
    let [users, guilds, channels, memory] = [0, 0, 0, 0]

    if (this.client.shard) {
      const results = await this.client.shard.broadcastEval('[this.users.cache.size, this.guilds.cache.size, this.channels.cache.size, (process.memoryUsage().heapUsed / 1024 / 1024)]')
      for (const result of results) {
        /* eslint-disable @typescript-eslint/restrict-plus-operands */
        users += result[0]
        guilds += result[1]
        channels += result[2]
        memory += result[3]
      }
    }

    return await message.util.send(
      new MessageEmbed({
        title: `${this.client.user.tag} ${config.version}`,
        description:
          '\n **Versions**' +
          `\n **Node.js:** ${process.version}` +
          `\n **TypeScript:** v${typescript.version}` +
          `\n **Discord.js:** ${DiscVer}` +
          `\n **Discord-Akairo:** ${AkaiVer} \n` +
          '\n **Status**' +
          `\n **Memory Usage:** ${(memory || process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB` +
          `\n **User Count:** ${(users || this.client.users.cache.size).toLocaleString()}` +
          `\n **Guild Count:** ${(guilds || this.client.guilds.cache.size).toLocaleString()}` +
          `\n **Channel Count:** ${(channels || this.client.channels.cache.size).toLocaleString()}`,
        color: 0xc4c4c4,
        thumbnail: {
          url: this.client.user.avatarURL({ dynamic: true })
        },
        timestamp: new Date(),
        footer: {
          icon_url: this.client.user.avatarURL({ dynamic: true })
        }
      })
    )
  }
}
