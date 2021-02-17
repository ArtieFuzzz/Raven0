const { Command } = require('discord-akairo');

class AddCommand extends Command {
    constructor() {
        super('add', {
            aliases: ['add'],
            args: [
                {
                    id: 'numOne',
                    type: 'number',
                    default: 0
                },
                {
                    id: 'numTwo',
                    type: 'number',
                    default: 0
                },
                {
                    id: 'numThree',
                    type: 'number',
                    default: 0
                }
            ]
        });
    }

    exec(message, args) {
        const sum = args.numOne + args.numTwo + args.numThree;
        return message.reply(`The sum is ${sum}!`);
    }
}

module.exports = AddCommand;