const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js')

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class DankMemeCommand extends Command {
    constructor() {
        super('dankmeme', {
           aliases: ['dankmeme'] 
        });
    }

    async exec(message) {
    const { url, post } = await ksoft.images.reddit('dankmemes');
    const embed = new MessageEmbed()
    .setTitle(post.title)
    .setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
    .setURL(post.link)
    .setTimestamp()
    .setImage(url)
    .setColor("RANDOM");
    message.channel.send(embed);
    }
}

module.exports = DankMemeCommand;