const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class DogeCommand extends Command {

	constructor() {
		super('doge', {
			aliases: ['doge'],
			category: 'Images',
			description: {
				usage: 'doge',
				examples: ['doge'],
				description: 'Returns doge image.'
			},
			ratelimit: '3',
			cooldown: '3000'
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
