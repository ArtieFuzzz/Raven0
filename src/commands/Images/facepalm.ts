import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class AwwCommand extends Command {
  public constructor () {
    super('facepalm', {
      aliases: ['facepalm'],
      category: 'Images',
      description: 'Returns a Image you should facepalm at',
      ratelimit: 3
    })

    this.help = {
      usage: 'facepalm',
      examples: ['facepalm']
    }
  }

  public async exec (message: Message): Promise<Message> {
    const { url, post } = await this.client.ksoft.images.reddit('facepalm', { removeNSFW: true, span: 'day' })
    const embed = new MessageEmbed()
      .setTitle(post.title)
      .setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
      .setURL(post.link)
      .setTimestamp()
      .setImage(url)
      .setColor('RANDOM')
    return await message.util.send(embed)
  }
}
