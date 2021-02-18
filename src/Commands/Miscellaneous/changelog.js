const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class ChangelogCommand extends Command {
    constructor() {
        super('changelog', {
           aliases: ['changelog', 'cl', 'clog'],
           category: 'Miscellaneous',
           description: {
               usage: 'changelog',
               description: 'Bot replies back with the changelog.'
           }
        });
    }

    exec(message) {
        const embed = new MessageEmbed()
        .setTitle('Changelog | V5')
        .setURL('https://github.com/ArtieFuzzz/Kairo')
        .setFooter('Source: https://github.com/ArtieFuzzz/Kairo')
        .setDescription('Katsu is no longer using DBM. It\'s now using discord-akairo\n\n**What does this mean?**\n\nMost commands that are made with DBM will no longer work as the new code cannot use DBM data\n\nI\'ll maybe try to re-write them whenever I feel like it.\n\nKatsu => Kairo');

        message.channel.send(embed)
    }
}

module.exports = ChangelogCommand;