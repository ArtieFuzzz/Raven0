const { Listener } = require('discord-akairo');

class MessageListener extends Listener {

	constructor() {
		super('message', {
			emitter: 'client',
			event: 'message'
		});
	}

	async exec(message) {
		if (!message.guild) return;
		// eslint-disable-next-line require-unicode-regexp, prefer-named-capture-group
		const matches = /([\w-]+={0,2})\.([\w-]+={0,2})\.([\w-]+={0,2})/g.exec(message.content);
		if (!matches) return;
		const [, botID] = matches;

		try {
			// eslint-disable-next-line no-undef
			BigInt(Buffer.from(botID, 'base64').toString());

			if (message.deleteable) await message.delete();
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
		}
	}

}

module.exports = MessageListener;
