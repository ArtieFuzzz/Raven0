const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping'],
           category: 'Miscellaneous',
           description: {
               usage: 'ping',
               description: 'Bot replies back with "Pong!".'
           }
        });
    }

    exec(message) {
        return message.reply('Pong!');
    }
}

module.exports = PingCommand;