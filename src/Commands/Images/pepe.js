const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js')

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class PepeCommand extends Command {
    constructor() {
        super('pepe', {
           aliases: ['pepe'],
           category: 'Images',
           cooldown: 1000,
           ratelimit: 3,
           description: {
               usage: 'pepe',
               examples: ['pepe'],
               description: 'Returns pepe image.'
           }
        });
    }

   async exec(message) {
    const { url } = await ksoft.images.random('pepe');
    const embed = new MessageEmbed()
    .setTitle('Pepe the Frog')
    .setFooter(`Powered by api.ksoft.si`)
    .setTimestamp()
    .setImage(url)
    .setColor("RANDOM");
    message.channel.send(embed);
    }
}

module.exports = PepeCommand;