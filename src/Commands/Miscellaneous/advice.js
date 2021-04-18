const { Command } = require('klasa');

class AdviceCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['vice'],
		});
	}

	async run(message) {
		const Data = await this.client.srod.GetAdvice({ Color: 'RANDOM' });
		return message.channel.send(Data);
	}
}

module.exports = AdviceCommand;