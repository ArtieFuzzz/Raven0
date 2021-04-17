const { Inhibitor } = require('klasa');

class AntiLinkInhibitor extends Inhibitor {

	constructor(...args) {
		super(...args, {
			name: 'Anti Link',
			enabled: true,
		});
	}

	async run(message) {
		const status = await message.guild.settings.get(message.guild.id);

		if (status) {
			const reg = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
			if (reg.test(message.content)) {
				message.delete().catch(e => {
					console.log(e);
				});
				message.channel.send('You can\'t send links!');
			}
		}
	}
}

module.exports = AntiLinkInhibitor;