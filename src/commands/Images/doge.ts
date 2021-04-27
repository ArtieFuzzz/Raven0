import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class DogeCommand extends Command {
  public constructor () {
    super('doge', {
      aliases: ['doge'],
      category: 'Images',
      description: 'Returns a doge Image',
      ratelimit: 3
    })

    this.help = {
      usage: 'doge',
      examples: ['doge']
    }
  }

  public async exec (message: Message): Promise<Message> {
    const { url } = await this.client.ksoft.images.random('doge', { nsfw: false })
    const embed = new MessageEmbed()
      .setTitle('Doge!')
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setColor('White')
      .setTimestamp()
      .setImage(url)
    return await message.util.send(embed)
  }
}
