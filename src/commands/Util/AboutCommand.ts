import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { PackageJson } from '../../config'
import { MessageEmbed } from '../../structures/MessageEmbed'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg: PackageJson = require('../../../package.json')

export default class AboutCommand extends Command {
  public constructor () {
    super('about', {
      aliases: ['about'],
      category: 'Util',
      description: 'Show information about this bot',
      ratelimit: 3
    })

    this.help = {
      usage: 'about',
      examples: ['about']
    }
  }

  public async exec (message: Message): Promise<Message> {
    return await message.util.send(
      new MessageEmbed({
        title: this.client.user.username + ' About',
        description:
          `Hello! I'm ${this.client.user.username}, a discord bot!` +
          '\nA bot with image commands! Just partner me up with some other bots and you\'re good to go!' +
          '\n ' +
          '\nAs I am still a work in progress, errors may occur. Report any issues to the repository (see below)' +
          '\n`Support server currently unavailable please DM the owner instead @ ArtieFuzzz#8298`.\n',
        color: 0xc4c4c4,
        thumbnail: {
          url: this.client.user.avatarURL({ dynamic: true })
        },
        fields: [
          {
            name: 'Developed by',
            value: 'ArtieFuzzz#8298 | GitLab: [ArtieFuzzz](https://gitlab.com/raven0-bot/Raven/-/tree/TypeScript)',
            inline: false
          },
          {
            name: 'Raven0',
            value: `Version: ${pkg.version}` + '\nWritten in TypeScript, powered by Node.js',
            inline: false
          },
          {
            name: 'Useful Links',
            value:
              '[GitHub](https://github.com/TMUniversal/discord-bot-template)' +
              '\n[TM Universal](https://github.com/TMUniversal)',
            inline: true
          },
          {
            name: 'Built With',
            value:
              '[Discord.js](https://github.com/discordjs/discord.js#readme)' +
              '\n[Discord Akairo](https://github.com/discord-akairo/discord-akairo#readme)' +
              '\n[Discord Bot Template By TMUniversal (MIT License)](https://github.com/TMUniversal/discord-bot-template)',
            inline: false
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: this.client.user.avatarURL({ dynamic: true }),
          text: 'Raven0 - Since 2021'
        }
      })
    )
  }
}
