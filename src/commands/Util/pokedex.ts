import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'
import c from '@aero/centra'

export default class UrbanCommand extends Command {
  public constructor () {
    super('pokedex', {
      aliases: ['pokedex'],
      category: 'Util',
      description: 'Search something up on the Pokedex',
      ratelimit: 3,
      args: [
        {
          id: 'search',
          type: 'string',
          match: 'content',
          description: 'Your search'
        }
      ]
    })

    this.help = {
      usage: 'pokedex',
      examples: ['pokedex pikachu']
    }
  }

  public async exec (message: Message, { search }: { search: string }): Promise<Message> {
    try {
      const res = await c(`https://some-random-api.ml/pokedex?pokemon=${search}`).send()
      const data = await res.json

      if (data.error) return await message.util.reply('That pokemon does not exist')

      const embed = new MessageEmbed()
        .setTitle(data.name)
        .addField('Type(s)', data.type ? data.type.join(', ') : 'None', true)
        .addField('Abilities(s)', data.abilities ? data.abilities.join(', ') : 'None', true)
        .addField('Height', data.height, true)
        .addField('Weight', data.weight, true)
        .addField('Base XP', data.base_experience, true)
        .setDescription(data.description)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .setFooter(`ID: ${data.id}`)
      return await message.channel.send(embed)
    }
    catch (err) {
      return await message.channel.send(err.message)
    }
  }
}
