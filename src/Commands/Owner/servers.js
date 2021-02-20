const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('servers', {
           aliases: ['server', 'botserver'],
           category: 'Owner',
           ownerOnly: true,
           description: {
               usage: 'server',
               examples: ['ping', 'p'],
               description: 'Bot returns the servers it\'s in".'
           }
        });
    }

    async exec(message) {
        let guilds = this.client.guilds.cache.map(r => `${r.name} (${r.id})`);
        message.channel.send(guilds)
    }
}

module.exports = PingCommand;