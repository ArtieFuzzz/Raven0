const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js')

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class NekoCommand extends Command {
    constructor() {
        super('neko', {
           aliases: ['neko'],
           category: 'NSFW',
           description: {
               usage: 'neko',
               examples: ['neko'],
               description: 'Returns a random nsfw image of a neko.'
           }
        });
    }

    async exec(message) {
    if (!message.guild) return true;
    if (!message.channel.nsfw) {
            message.util.send(':x: This command only runs in NSFW channels');
            return true;
        }

    const { url } = await ksoft.images.random('neko', { nsfw: true });
    const embed = new MessageEmbed()
    .setTitle('.w.')
    .setFooter('Powered by api.ksoft.si')
    .setColor("RANDOM")
    .setTimestamp()
    .setImage(url);
    message.channel.send(embed)
    }
}

module.exports = NekoCommand;