const { Listener } = require('discord-akairo');

    class ErrorListener extends Listener {
        constructor() {
            super('error', {
                emitter: 'client',
                event: 'error'
            })
        }

        exec(err) {
            console.error(chalk.red(`[Error] ${err}`));
        }
    }

module.exports = ErrorListener;