const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class BirbCommand extends Command {

	constructor() {
		super('birb', {
			aliases: ['birb', 'bird'],
			category: 'Images',
			description: {
				usage: 'birb',
				examples: ['birb', 'bird'],
				description: 'Returns birb image.',
			},
			ratelimit: 2,
			cooldown: 1000,
		});
	}

	async exec(message) {
		const { url } = await ksoft.images.random('birb');
		const embed = new MessageEmbed()
			.setTitle('Birds!')
			.setFooter('Powered by api.ksoft.si')
			.setTimestamp()
			.setImage(url)
			.setColor('RANDOM');
		message.channel.send(embed);
	}

}

module.exports = BirbCommand;
