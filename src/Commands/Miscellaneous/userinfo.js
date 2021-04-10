const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

class UserinfoCommand extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['user', 'whois'],
			usage: '[member:user]',
			bucket: 3,
			cooldown: 3000,
		});
	}

	async run(message, [member]) {
		const target = await member;

		const uEmbed = new MessageEmbed()
			.setTitle(`${target.user.tag} [${target.user.id}]`)
			.setThumbnail(message.guild.iconURL({ format: 'jpg' }))
			.setFooter(`Author: ${target.user.username}`, target.user.displayAvatarURL({ format: 'jpg' }))
			.setDescription(`**Status:** ${target.presence.status}\n**Created At:** ${dayjs(target.createdAt).format('hh:mm A')} - ${dayjs(target.createdAt).format('DD/MM/YY')}`)
			.setColor('0xC76CF5');

		message.channel.send(uEmbed);
	}

}

module.exports = UserinfoCommand;
