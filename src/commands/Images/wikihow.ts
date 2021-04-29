import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class WikiHowCommand extends Command {
  public constructor () {
    super('wikihow', {
      aliases: ['wikihow', 'wh'],
      category: 'Images',
      description: 'Returns a wikihow Article and Image',
      ratelimit: 3
    })

    this.help = {
      usage: 'wikihow',
      examples: ['wikihow', 'wh']
    }
  }

  public async exec (message: Message): Promise<Message> {
    const { url, article } = await this.client.ksoft.images.wikihow()
    const embed = new MessageEmbed()
      .setTitle(article.title)
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setColor('GREEN')
      .setTimestamp()
      .setImage(url)
    return await message.util.send(embed)
  }
}
