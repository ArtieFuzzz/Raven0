const { Command } = require('discord-akairo');
const random = require('srod-v2');

class AdviceCommand extends Command {
	constructor() {
		super('advice', {
			aliases: ['advice', 'vice'],
			category: 'Miscellaneous',
			description: {
				usage: 'something',
				examples: ['example', 'example2'],
				description: 'Example.',
			},
		});
	}

	async exec(message) {
		const Data = await random.GetAdvice({ Color: 'RANDOM' });
		return message.channel.send(Data);
	}
}

module.exports = AdviceCommand;