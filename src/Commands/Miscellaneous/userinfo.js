const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

    class UserinfoCommand extends Command {
        constructor() {
            super('userinfo', {
                aliases: ['userinfo', 'user', 'whois'],
                category: 'Miscellaneous',
                args: [{ 
                    id: 'member', type: 'member', default: _ => _.member
                }],
                description: {
                    usage: 'userinfo < @Mention | id | username >',
                    examples: ['userinfo @host', 'userinfo 123456789012345678', 'userinfo host'],
                    description: 'Display\'s user information'
                },
                category: 'Miscellaneous',
                cooldown: 3000,
                ratelimit: 3
            });
        }

        async exec(message) {
            
            let target = message.mentions.users.first() || message.author;
            
             let uEmbed = new MessageEmbed()
                .setTitle(`${target.tag} [${target.id}]`)
                .setThumbnail(message.guild.iconURL({ format: 'jpg' }))
                .setAuthor(`${target.username} Info`, target.displayAvatarURL({ format: 'jpg' }))
                .setDescription(`**Status:** ${target.presence.status}\n**Create At:** ${moment(target.createdAt).format('LT')} - ${moment(target.updatedAt).format('L')} - ${moment(target.createdAt).fromNow()}`)
                .setColor(0xC76CF5)
                .setFooter(`Sparrow | Have a nice day!`);

            message.channel.send(uEmbed);
          
        }
    }

module.exports = UserinfoCommand;