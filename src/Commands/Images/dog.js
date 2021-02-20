const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js')

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class DogCommand extends Command {
    constructor() {
        super('dog', {
           aliases: ['dog', 'doggo'],
           category: 'Images',
           cooldown: 1000,
           ratelimit: 3,
           description: {
               usage: 'dog',
               examples: ['doggo', 'dog'],
               description: 'Returns dog image.'
           }
        });
    }

   async exec(message) {
    const { url } = await ksoft.images.random('dog');
    const embed = new MessageEmbed()
    .setFooter(`Powered by api.ksoft.si`)
    .setTimestamp()
    .setImage(url)
    .setColor("RANDOM");
    message.channel.send(embed);
    }
}

module.exports = DogCommand;