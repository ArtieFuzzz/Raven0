import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import sxcu from 'sxcu.js'

export default class ShortenCommand extends Command {
  public constructor () {
    super('shorten', {
      aliases: ['shorten'],
      category: 'Miscellaneous',
      description: 'Make some long URL shorter and sus',
      ratelimit: 3,
      args: [
        {
          id: 'link',
          type: 'string',
          match: 'content',
          description: 'a URL'
        }
      ]
    })

    this.help = {
      usage: 'shorten',
      examples: ['shorten']
    }
  }

  public async exec (message: Message, { link }: { link: string }): Promise<Message> {
    if (!link) return await message.channel.send('Can\'t create a short URL from thin air!')
    try {
      const shortlink = await sxcu.shortenLink(link)
      const url = await shortlink.getUrl()
      message.channel.send(`**Done!** ${url}`)
    }
    catch (err) {
      return await message.channel.send(err.message)
    }
  }
}
