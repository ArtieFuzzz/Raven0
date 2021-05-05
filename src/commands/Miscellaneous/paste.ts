import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import sxcu from 'sxcu.js'

export default class PasteCommand extends Command {
  public constructor () {
    super('paste', {
      aliases: ['paste'],
      category: 'Miscellaneous',
      description: 'create a Paste (cancer-co.de)',
      ratelimit: 3,
      args: [
        {
          id: 'str',
          type: 'string',
          match: 'content',
          description: 'Input'
        }
      ]
    })

    this.help = {
      usage: 'paste',
      examples: ['paste *Insert long code here*']
    }
  }

  public async exec (message: Message, { str }: { str: string }): Promise<Message> {
    if (!str) return await message.channel.send('Can\'t create a paste from thin air!')
    try {
      const paste = await sxcu.createPaste(str)
      const url: string = await paste.getUrl()
      message.channel.send(`Created: ${url}`)
    }
    catch (err) {
      return await message.channel.send(err.message)
    }
  }
}
