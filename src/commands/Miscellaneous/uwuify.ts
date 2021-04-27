import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import UwU from 'uwuifier'

export default class OwOifyCommand extends Command {
  public constructor () {
    super('uwuify', {
      aliases: ['uwuify'],
      category: 'Miscellaneous',
      description: 'UwUify a string',
      ratelimit: 3,
      args: [
        {
          id: 'str',
          type: 'string',
          description: 'String to uwuify'
        }
      ]
    })

    this.help = {
      usage: 'uwuify',
      examples: ['uwuify <string>']
    }
  }

  public async exec (message: Message, { str }: { str: string }): Promise<Message> {
    const uwuify = new UwU()
    return await message.channel.send(uwuify.uwuifySentence(str))
  }
}
