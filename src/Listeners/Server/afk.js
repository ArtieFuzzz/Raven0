/* eslint-disable complexity */
/* eslint-disable handle-callback-err */
/* eslint-disable no-inline-comments */
const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class AFKListener extends Listener {

	constructor() {
		super('afk', {
			emitter: 'client',
			event: 'message'
		});
	}

	async exec(message) {
		/* Credit to Azrail#4817 from: Dark Studio who originally created this command*/
		/* Edit by: ArtieFuzzz#8298*/
		if (message.author.bot || message.channel.type === 'dm') return;

		const authorStatus = await this.client.db.fetch(`afk_${message.author.id}-${message.guild.id}`),
			mentioned = message.mentions.members.first();

		if (mentioned) {
			const status = await this.client.db.fetch(`afk_${mentioned.id}-${message.guild.id}`);

			if (status) {
				const embed = new MessageEmbed()
					.setColor('RANDOM')
					.setDescription(`${mentioned.user.tag} is AFK: **${status}**`);
				message.channel.send(embed).then(i => i.delete({ timeout: 5000 }));
			}
		}

		if (authorStatus) {
			const embed = new MessageEmbed()
				.setColor('RANDOM')
				.setDescription(`Welcome back! **${message.author.tag}** you are no longer AFK.`);
			message.channel.send(embed).then(i => i.delete({ timeout: 5000 }));
			this.client.db.delete(`afk_${message.author.id}-${message.guild.id}`);
			// eslint-disable-next-line no-unused-vars
			message.member.setNickname(`${message.member.nickname ? message.member.nickname.split('[AFK]').join('') : message.author.username}`).catch(err => null);
		}
	}

}

module.exports = AFKListener;
