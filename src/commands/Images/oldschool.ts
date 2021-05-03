import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class OldSchoolCommand extends Command {
  public constructor () {
    super('oldschool', {
      aliases: ['oldschool', 'oldschoolcool'],
      category: 'Images',
      description: 'Returns a Image from r/OldSchoolCool',
      ratelimit: 3
    })

    this.help = {
      usage: 'oldschool',
      examples: ['oldschool', 'oldschoolcool']
    }
  }

  public async exec (message: Message): Promise<Message> {
    const { url, post } = await this.client.ksoft.images.reddit('oldschoolcool', { removeNSFW: true, span: 'day' })
    const embed = new MessageEmbed()
      .setTitle(post.title)
      .setFooter('Powered by api.ksoft.si')
      .setURL(post.link)
      .setColor('White')
      .setTimestamp()
      .setImage(url)
    return await message.util.send(embed)
  }
}
