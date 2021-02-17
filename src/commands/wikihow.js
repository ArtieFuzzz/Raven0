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
        const { article, url } = await ksoft.images.wikihow();
        const embed = new DiscordJS.MessageEmbed()
        .setTitle(article.title)
        .setFooter('Powered by api.ksoft.si')
        .setURL(article.link)
        .setColor("RANDOM")
        .setImage(url)
        .setTimestamp();
        message.channel.send(embed)
    }
}

module.exports = DankMemeCommand;