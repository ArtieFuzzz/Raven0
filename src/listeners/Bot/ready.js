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
        console.log(chalk.blue('|--------------------------|'))
        console.log(chalk.yellow(`[Starting] Loaded ${this.client.commandHandler.modules.size} Commands`))
        console.log(chalk.yellow(`[Starting] Loaded ${this.client.inhibitorHandler.modules.size} Inhibitors`))
        console.log(chalk.yellow(`[Starting] Loaded ${this.client.listenerHandler.modules.size} Listeners`))
        console.log(chalk.green(`[Ready] Logged in as ${this.client.user.tag}`));
        this.client.user.setActivity(`To Music | ${process.env.PREFIX}`, { type: 'LISTENING' })
    }
}

module.exports = ReadyListener;