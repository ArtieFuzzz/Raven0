const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js')

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class HentaiCommand extends Command {
    constructor() {
        super('femboy', {
           aliases: ['femboy'],
           category: 'NSFW',
           description: {
               usage: 'femboy',
               examples: ['femboy'],
               description: 'Returns a random NSFW image from r/FemBoys.'
           }
        });
    }

    async exec(message) {
    if (!message.guild) return true;
    if (!message.channel.nsfw) {
            message.util.send(`:x: This command only runs in NSFW channels. Did you mean ${process.env.PREFIX}sfemboy?`);
            return true;
        }

    const { url, post } = await ksoft.images.reddit('FemBoys');
    const embed = new MessageEmbed()
    .setTitle(post.title)
    .setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
    .setURL(post.link)
    .setColor("PINK")
    .setTimestamp()
    .setImage(url);
    message.channel.send(embed)
    }
}

module.exports = HentaiCommand;