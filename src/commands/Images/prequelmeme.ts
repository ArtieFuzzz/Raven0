import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class PrequelMemesCommand extends Command {
  public constructor () {
    super('prequelmeme', {
      aliases: ['prequelmeme', 'pmeme', 'pm'],
      category: 'Images',
      description: 'Returns a Image from r/PrequelMemes',
      ratelimit: 3
    })

    this.help = {
      usage: 'prequelmeme',
      examples: ['prequelmeme', 'pmeme', 'pm']
    }
  }

  public async exec (message: Message): Promise<Message> {
    const { url, post } = await this.client.ksoft.images.reddit('PrequelMemes', { removeNSFW: true, span: 'day' })
    const embed = new MessageEmbed()
      .setTitle(post.title)
      .setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
      .setURL(post.link)
      .setTimestamp()
      .setImage(url)
      .setColor('BLACK')
    return await message.util.send(embed)
  }
}
