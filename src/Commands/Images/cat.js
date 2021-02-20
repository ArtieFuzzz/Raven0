const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js')

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class CatCommand extends Command {
    constructor() {
        super('cat', {
           aliases: ['cat'],
           category: 'Images',
           cooldown: 1000,
           ratelimit: 3,
           description: {
               usage: 'cat',
               examples: ['cat'],
               description: 'Returns cat image.'
           }
        });
    }

   async exec(message) {
    const { url } = await ksoft.images.random('cat');
    const embed = new MessageEmbed()
    .setFooter(`Powered by api.ksoft.si`)
    .setTimestamp()
    .setImage(url)
    .setColor("RANDOM");
    message.channel.send(embed);
    }
}

module.exports = CatCommand;