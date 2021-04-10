const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

class AvatarCommand extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['av', 'pfp'],
			usage: '[user:username]',
		});
	}

	run(message, [user = message.author]) {
		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`${user.id === message.author.id ? 'Your' : `${user.user.tag}'s`} Profile Picture`)
			.setURL(user.user.displayAvatarURL())
			.setImage(user.user.displayAvatarURL({ size: 2048 }));

		return message.util.send({ embed });
	}

}

module.exports = AvatarCommand;
