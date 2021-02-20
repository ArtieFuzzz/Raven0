const { Listener } = require('discord-akairo');
const chalk = require('chalk');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        console.log(chalk.green(`[Ready] Logged in as ${this.client.user.tag}`));
        this.client.user.setActivity(`To Music | ${process.env.PREFIX}`, { type: 'LISTENING' })
    }
}

module.exports = ReadyListener;