const { Command } = require('discord-akairo');
const limit = require("@codedipper/random-code");

class RandomNickCommand extends Command {
    constructor() {
        super('random-nick', {
           aliases: ['random-nick', 'random-nickame'],
           category: 'Miscellaneous',
           description: {
               usage: 'random-nick <@user>',
               examples: ['random-nick @someone#0001', 'random-nickname'],
               description: 'Give a random nickname to mentioned user or yourself.'
           },
           cooldown: 2000,
           ratelimit: 3,
           userPermissions: ['MANAGE_NICKNAMES'],
           clientPermissions: ['MANAGE_NICKNAMES']
        });
    }

    exec(message) {
              let memberexe = message.mentions.members.first()
              if (!memberexe) return message.channel.send("Please mention a user!")

            let random = limit(5);
            memberexe.setNickname(random)
    }
}

module.exports = RandomNickCommand;