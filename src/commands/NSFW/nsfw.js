const { Command } = require('discord-akairo');

class NsfwCommand extends Command {
    constructor() {
        super('nsfw', {
           aliases: ['nsfw'],
           description: {
               usage: 'nsfw',
               description: 'Just a test command.'
           }
        });
    }

    exec(message) {
        if (!message.guild) return true;
        if (!message.channel.nsfw) {
            message.util.send(':x: This command only runs in NSFW channels');
            return true;
        }
        message.channel.send(':v)')
    }
}

module.exports = NsfwCommand;