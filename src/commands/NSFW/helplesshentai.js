const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js')

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class HentaiCommand extends Command {
    constructor() {
        super('helplesshentai', {
           aliases: ['helplesshentai'],
           category: 'NSFW',
           description: {
               usage: 'helplesshentai',
               examples: ['helplesshentai'],
               description: 'Returns a nsfw image of helplesshentai.'
           }
        });
    }

    async exec(message) {
    if (!message.guild) return true;
    if (!message.channel.nsfw) {
            message.util.send(':x: This command only runs in NSFW channels');
            return true;
        }

    const { url, post } = await ksoft.images.reddit('helplesshentai');
    const embed = new MessageEmbed()
    .setTitle(post.title)
    .setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
    .setURL(post.link)
    .setColor("RANDOM")
    .setTimestamp()
    .setImage(url);
    message.channel.send(embed)
    }
}

module.exports = HentaiCommand;