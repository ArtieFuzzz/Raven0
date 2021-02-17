const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js')

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class DankMemeCommand extends Command {
    constructor() {
        super('aww', {
           aliases: ['aww'] 
        });
    }

    exec(message) {
        const { url, post } = await ksoft.images.reddit('femboy');
        const embed = new DiscordJS.MessageEmbed()
        .setTitle(post.title)
        .setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
        .setURL(post.link)
        .setColor("RANDOM")
        .setTimestamp()
        .setImage(url);
        message.channel.send(embed)
    }
}

module.exports = DankMemeCommand;