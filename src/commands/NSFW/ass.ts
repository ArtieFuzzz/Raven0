import { Command } from 'discord-akairo'
import { Message, DMChannel } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'

export default class AssCommand extends Command {
  public constructor () {
    super('ass', {
      aliases: ['ass'],
      category: 'Images',
      description: 'Returns an ass Image',
      ratelimit: 3
    })

    this.help = {
      usage: 'ass',
      examples: ['ass']
    }
  }

  public async exec (message: Message): Promise<Message> {
		if (message.channel instanceof DMChannel) return await message.channel.send('You can\'t use this command in DMs!');
		if (!message.channel.nsfw) return await message.util.send(':x: This command only runs in NSFW channels');

    const { url } = await this.client.ksoft.images.random('ass', { nsfw: true })
    const embed = new MessageEmbed()
      .setTitle('Thicc?')
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setTimestamp()
      .setImage(url)
      .setColor('BLACK')
    return await message.util.send(embed)
  }
}
