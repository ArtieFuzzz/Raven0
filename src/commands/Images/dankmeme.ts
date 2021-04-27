import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class DankMemeCommand extends Command {
  public constructor () {
    super('dankmeme', {
      aliases: ['dankmeme', 'dkm'],
      category: 'Images',
      description: 'Returns a Image from r/dankmemes',
      ratelimit: 3
    })

    this.help = {
      usage: 'dankmeme',
      examples: ['dankmeme', 'dkm']
    }
  }

  public async exec (message: Message): Promise<Message> {
    const { url, post } = await this.client.ksoft.images.reddit('dankmemes', { removeNSFW: true, span: 'day' })
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
