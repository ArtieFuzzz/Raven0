const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js')

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class HelplessHentaiCommand extends Command {
    constructor() {
        super('hentai', {
           aliases: ['hentai'] 
        });
    }

    async exec(message) {
    if (!message.guild) return true;
    if (!message.channel.nsfw) {
            message.util.send(':x: This command only runs in NSFW channels');
            return true;
        }

    const { url, post } = await ksoft.images.reddit('hentai');
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

module.exports = HelplessHentaiCommand;