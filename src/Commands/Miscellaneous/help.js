/* eslint-disable no-mixed-operators */
/* eslint-disable complexity */
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { formatName } = require('../../Util/functions');

class HelpCommand extends Command {

	constructor() {
		super('help', {
			aliases: ['help', 'h', 'halp', 'commands'],
			category: 'Miscellaneous',
			args: [ { id: 'command', type: 'commandAlias', match: 'content', default: null } ],
			description: {
				usage: 'help < command >',
				examples: ['help', 'comands', 'h'],
				description: 'Display\'s the commands of the bot',
			},
			ratelimit: '3',
			cooldown: '3000',
		});
	}

	async exec(message, { command }) {
		if (!command) {
			const embed = new MessageEmbed();
			this.handler.categories.forEach((cm, category) => {
				const dirSize = cm.filter(cmd => cmd.category === cm);
				let mappedOut = cm.map(x => `\`${x}\``).join(', ');
				if (category === 'Owner' && !this.client.ownerID.includes(message.author.id)
                        || category === 'Moderation' && !message.member.permissions.has('MANAGE_MESSAGES') || category === 'NSFW' && !message.channel.nsfw
				) mappedOut = '`Not available here / to you`';

				embed.addField(`${dirSize.size} | **${category} Commands**`, mappedOut)
					.setColor(this.client.colors.defaultColor)
					.setAuthor(`Help Menu | ${message.guild.name}`, message.guild.iconURL());
			});

			return message.util.send({ embed });
		}
		else if (command) {
			const cmd = command;
			const embed = new MessageEmbed()
				.setColor(this.client.colors.defaultColor)
				.setAuthor(`Help: ${formatName(cmd.aliases[0])} | ${message.guild.name}`, message.guild.iconURL())
				.setDescription(`
                            **Command Name**: \`${cmd.aliases[0]}\`
                            **Command Aliases**: ${`${cmd.aliases.map(x => `\`${x}\``).join(', ') || 'No Alias'}`}
                            **Command Cooldown**: \`${`${cmd.cooldown / 1000 }s` || 0}\`
                            **Command Ratelimit**: \`${cmd.ratelimit || 0}\`
                            **Owner Only**: \`${cmd.ownerOnly ? 'Yes' : 'No' || 'No'}\`
                            **Command Description**: ${cmd.description.description || 'A command'}
                            **Command Usage**: \`${cmd.description.usage || cmd.alises[0]}\`
                            **Command Examples**:\n\`\`\`${cmd.description.examples.join('\n') || cmd.aliases[0]}\`\`\``)
				.setFooter('Syntax: [required] : <optional>');
			return message.util.send({ embed });
		}
	}

}

module.exports = HelpCommand;
