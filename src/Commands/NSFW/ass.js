const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class AssCommand extends Command {

	constructor() {
		super('ass', {
			aliases: ['ass'],
			category: 'NSFW',
			description: {
				usage: 'ass',
				examples: ['ass'],
				description: 'Returns a random NSFW ass image.',
			},
			ratelimit: '3',
			cooldown: '3000',
		});
	}

	async exec(message) {
		if (!message.guild) return true;
		if (!message.channel.nsfw) {
			message.util.send(':x: This command only runs in NSFW channels');
			return true;
		}

		const { url } = await ksoft.images.random('ass', { nsfw: true });
		const embed = new MessageEmbed()
			.setTitle('Thicc?')
			.setFooter('Powered by api.ksoft.si')
			.setColor('RANDOM')
			.setTimestamp()
			.setImage(url);
		message.channel.send(embed);
	}

}

module.exports = AssCommand;
