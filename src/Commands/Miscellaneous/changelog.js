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
        .setTitle('Changelog')
        .setDescription('Using Akairo framework.\nMost commands got removed since some of the command mainly use the DBM Actions.\nI\'ll maybe try to re-write them whenever I feel like it')
        .url('https://github.com/ArtieFuzzz/Kairo')
        .setFooter('(Source)[https://github.com/ArtieFuzzz/Kairo]');

        message.channel.send(embed)
    }
}

module.exports = ChangelogCommand;