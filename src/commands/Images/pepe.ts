import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class DogCommand extends Command {
  public constructor () {
    super('pepe', {
      aliases: ['pepe'],
      category: 'Images',
      description: 'Returns a pepe Image',
      ratelimit: 3
    })

    this.help = {
      usage: 'pepe',
      examples: ['pepe']
    }
  }

  public async exec (message: Message): Promise<Message> {
    const { url } = await this.client.ksoft.images.random('pepe', { nsfw: false })
    const embed = new MessageEmbed()
      .setTitle('Pepe the frog')
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setColor('White')
      .setTimestamp()
      .setImage(url)
    return await message.util.send(embed)
  }
}
