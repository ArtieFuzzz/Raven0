const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class DogeCommand extends Command {
	constructor() {
		super('doge', {
			aliases: ['doge'],
			category: 'Images',
			cooldown: 1000,
			ratelimit: 3,
			description: {
				usage: 'doge',
				examples: ['doge'],
				description: 'Returns doge image.',
			},
		});
	}

	async exec(message) {
		const { url } = await ksoft.images.random('doge');
		const embed = new MessageEmbed()
			.setTitle('Doge! Wow')
			.setFooter('Powered by api.ksoft.si')
			.setTimestamp()
			.setImage(url)
			.setColor('RANDOM');
		message.channel.send(embed);
	}
}

module.exports = DogeCommand;