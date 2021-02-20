const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js')

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class BirbCommand extends Command {
    constructor() {
        super('birb', {
           aliases: ['birb', 'bird'],
           category: 'Images',
           cooldown: 1000,
           ratelimit: 3,
           description: {
               usage: 'birb',
               examples: ['birb', 'bird'],
               description: 'Returns birb image.'
           }
        });
    }

   async exec(message) {
    const { url } = await ksoft.images.random('birb');
    const embed = new MessageEmbed()
    .setFooter(`Powered by api.ksoft.si`)
    .setTimestamp()
    .setImage(url)
    .setColor("RANDOM");
    message.channel.send(embed);
    }
}

module.exports = BirbCommand;