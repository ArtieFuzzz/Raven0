import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from '../../structures/MessageEmbed'
import * as c from '@aero/centra'

export default class AdviceCommand extends Command {
  public constructor () {
    super('npm', {
      aliases: ['npm'],
      category: 'Util',
      description: 'Search up a NPM Package',
      ratelimit: 3,
      args: [
        {
          id: 'data',
          type: 'string',
          description: 'NPM Package'
        }
      ]
    })

    this.help = {
      usage: 'npm',
      examples: ['npm']
    }
  }

  public async exec (message: Message, { data }: { data: string }): Promise<Message> {
    const request = c(`https://registry.npmjs.org/${data}`)
    const { error, name, maintainers, author, keywords, license } = await request.json()

    if (error) {
      return await message.channel.send('Err! Not found')
    }
    else {
      const embed = new MessageEmbed()
        .setAuthor('NPM Package Information', 'https://i.imgur.com/8DKwbhj.png')
        .setThumbnail('https://images-ext-2.discordapp.net/external/ouvh4fn7V9pphARfI-8nQdcfnYgjHZdXWlEg2sNowyw/https/cdn.auth0.com/blog/npm-package-development/logo.png')
        .addField('Name', name, true)
        .addField('License', license || 'None', true)
        .addField('Author', author ? author.name ? author.name : author : '?', true)
      /* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/restrict-template-expressions */
        .addField('Maintainer(s)', maintainers ? maintainers.map(M => M.name).join(', ') : 'None', true)
        .addField('Keywords', keywords ? keywords.join(', ') : 'None')
        .addField('NPMJS', `https://www.npmjs.com/package/${name}`)
        .setImage(`https://nodei.co/npm/${name}.png?downloads=true&compact=true`)
        .setFooter(`Requested By ${message.author.username}`)
        .setTimestamp()
      return await message.channel.send(embed)
    }
  }
}
