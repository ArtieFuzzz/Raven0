const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class ChangelogCommand extends Command {
	constructor() {
		super('changelog', {
			aliases: ['changelog', 'cl', 'clog'],
			category: 'Miscellaneous',
			description: {
				usage: ['changelog'],
				description: 'Bot replies back with the changelog.',
			},
		});
	}

	exec(message) {
		const embed = new MessageEmbed()
			.setTitle('Changelog | V5')
			.setURL('https://github.com/ArtieFuzzz/Sparrow')
			.setFooter('Source: https://github.com/ArtieFuzzz/Sparrow')
			.setDescription('AFK Command\nThat\'s all!');

		message.channel.send(embed);
	}
}

module.exports = ChangelogCommand;