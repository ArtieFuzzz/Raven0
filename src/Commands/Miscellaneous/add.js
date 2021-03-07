const { Command } = require('discord-akairo');

class AddCommand extends Command {

	constructor() {
		super('add', {
			aliases: ['add'],
			category: 'Miscellaneous',
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
			],
			description: {
				usage: 'add [Num 1] [Num 2] <Num 3>',
				examples: ['add 12 25', 'add 2 2', 'add 1 1 9'],
				description: 'Add numbers together.'
			}
		});
	}

	exec(message, args) {
		if (!args.length) return message.channel.send('Uh I\'ve got nothing to add together!');
		if (!args.numTwo) return message.channel.send('You need 2 numbers');
		const sum = args.numOne + args.numTwo + args.numThree;
		return message.reply(`The sum is ${sum}!`);
	}

}

module.exports = AddCommand;
