const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class DogCommand extends Command {
	constructor() {
		super('dog', {
			aliases: ['dog', 'doggo'],
			category: 'Images',
			description: {
				usage: 'dog',
				examples: ['doggo', 'dog'],
				description: 'Returns dog image.',
			},
			ratelimit: '3',
			cooldown: '3000',
		});
	}

	async exec(message) {
		const { url } = await ksoft.images.random('dog');
		const embed = new MessageEmbed()
			.setTitle('Doggo\'s!')
			.setFooter('Powered by api.ksoft.si')
			.setTimestamp()
			.setImage(url)
			.setColor('RANDOM');
		message.channel.send(embed);
	}
}

module.exports = DogCommand;