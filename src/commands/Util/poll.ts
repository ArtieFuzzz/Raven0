import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class AdviceCommand extends Command {
  public constructor () {
    super('poll', {
      aliases: ['poll'],
      category: 'Util',
      description: 'Make a poll',
      ratelimit: 3,
      args: [
        {
          id: 'str',
          type: 'string',
          description: 'Message'
        }
      ]
    })

    this.help = {
      usage: 'poll <message>',
      examples: ['poll']
    }
  }

  public async exec (message: Message, { str }: { str: string}): Promise<Message> {
    if (!str) return await message.channel.send('Can\'t make a poll if you don\'t give me anything to make a poll with')

    const poll = new MessageEmbed()
      .setTitle('Poll!')
      .setDescription(str)
      .setAuthor(message.author.tag)

    await message.channel.send(poll).then(embed => {
      embed.react('👍')
      embed.react('👎')
    })
  }
}
