const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { inspect } = require('util')
require('dotenv').config();
const prefix = process.env.PREFIX;

class EvalCommand extends Command {
    constructor() {
        super('eval', {
           aliases: ['eval', 'e', 'ev'] ,
           ownerOnly: true,
           category: 'Owner'
        });
    }

    exec(message) {
    const embed = new MessageEmbed()
    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }))

const args = message.content.slice(prefix.length).trim().split(/ +/g); args.shift()
const query = args.join(' ')
const code = (lang, code) => (`\`\`\`${lang}\n${String(code).slice(0, 1000) + (code.length >= 1000 ? '...' : '')}\n\`\`\``).replace(this.client.token, "Uh oh! I can't do that!")

if (!query) message.channel.send('Please, write something so I can evaluate!')
else {
  try {
    const evald = eval(query)
    const res = typeof evald === 'string' ? evald : inspect(evald, { depth: 0 })

    embed.addField('Result', code('js', res))

    if (!Boolean(res) || (!Boolean(evald) && evald !== 0)) embed.setColor('RED')
    else {
      embed
        .addField('Type', code('css', typeof evald))
        .setColor('GREEN')
    }
  } catch (error) {
    embed
      .addField('Error', code('js', error))
      .setColor('RED')
  } finally {
      message.channel.send(embed).catch(error => {
      message.channel.send(`There was an error while displaying the eval result! ${error.message}`)
    })
  }
}
    }
}

module.exports = EvalCommand;