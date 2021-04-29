import { Command } from 'discord-akairo'
import { Message, DMChannel } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class HentaiGifCommand extends Command {
  public constructor () {
    super('hentaigif', {
      aliases: ['hentaigif', 'hg'],
      category: 'NSFW',
      description: 'Returns an hentai Gif',
      ratelimit: 3
    })

    this.help = {
      usage: 'hentaigif',
      examples: ['hentaigif']
    }
  }

  public async exec (message: Message): Promise<Message> {
    if (message.channel instanceof DMChannel) return await message.channel.send('You can\'t use this command in DMs!')
    if (!message.channel.nsfw) return await message.util.send(':x: This command only runs in NSFW channels')

    const { url } = await this.client.ksoft.images.random('hentai_gif', { nsfw: true })
    const embed = new MessageEmbed()
      .setTitle('Hentaii!!')
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setTimestamp()
      .setImage(url)
      .setColor('PINK')
    return await message.util.send(embed)
  }
}
