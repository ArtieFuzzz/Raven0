const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js')

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class HentaiCommand extends Command {
    constructor() {
        super('femboy', {
           aliases: ['femboy'],
           category: 'NSFW',
           args: [
            {
                id: 'span',
                type: 'string',
                default: 0
            }],
           description: {
               usage: 'femboy <span>',
               examples: ['femboy', 'femboy hour', 'femboy month', 'femboy year'],
               description: 'Returns a random NSFW image from r/FemBoys.'
           }
        });
    }

    async exec(message, args) {
    if (!message.guild) return true;
    if (!message.channel.nsfw) {
            message.util.send(`:x: This command only runs in NSFW channels. Did you mean ${process.env.PREFIX}sfemboy?`);
            return true;
        }

    const { url, post } = await ksoft.images.reddit('FemBoys', { span: `${args.span}`});
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