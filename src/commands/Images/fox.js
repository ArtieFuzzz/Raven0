const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js')

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class FoxCommand extends Command {
    constructor() {
        super('fox', {
           aliases: ['fox', 'foxx'],
           category: 'Images',
           cooldown: 1000,
           ratelimit: 3,
           description: {
               usage: 'fox',
               examples: ['fox'],
               description: 'Returns fox image.'
           }
        });
    }

   async exec(message) {
    const { url } = await ksoft.images.random('fox');
    const embed = new MessageEmbed()
    .setTitle('Fox!')
    .setFooter(`Powered by api.ksoft.si`)
    .setTimestamp()
    .setImage(url)
    .setColor("RANDOM");
    message.channel.send(embed);
    }
}

module.exports = FoxCommand;