const { Command } = require('klasa');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class KappaCommand extends Command {

	constructor(...args) {
		super(...args, {
			bucket: 2,
			cooldown: 1,
		});
	}

	async run(message) {
		const { url } = await ksoft.images.random('kappa');
		const embed = new MessageEmbed()
			.setTitle('Kappa')
			.setFooter('Powered by api.ksoft.si')
			.setTimestamp()
			.setImage(url)
			.setColor('RANDOM');
		message.channel.send(embed);
	}

}

module.exports = KappaCommand;
