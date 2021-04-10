const { Command } = require('klasa');
const random = require('srod-v2');

class AdviceCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['vice'],
		});
	}

	async run(message) {
		const Data = await random.GetAdvice({ Color: 'RANDOM' });
		return message.channel.send(Data);
	}
}

module.exports = AdviceCommand;