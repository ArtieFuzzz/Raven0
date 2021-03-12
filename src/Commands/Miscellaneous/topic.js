const { Command } = require('discord-akairo');
const Random = require('srod-v2');

class TopicCommand extends Command {
	constructor() {
		super('topic', {
			aliases: ['topic', 'topics'],
			category: 'Miscellaneous',
			description: {
				usage: 'topic',
				examples: ['topic'],
				description: 'Get a random topic.',
			},
		});
	}

	async exec(message) {
		// eslint-disable-next-line no-undef
		const Data = await Random.GetTopic({ Color: 'RANDOM' });
		return message.channel.send(Data);
	}
}

module.exports = TopicCommand;