const { Command } = require('discord-akairo');

class InviteCommand extends Command {
	constructor() {
		super('invite', {
			aliases: ['invite', 'inv'],
			category: 'Miscellaneous',
			description: {
				usage: 'invite',
				examples: ['invite', 'inv'],
				description: 'Get the bot invite.',
			},
		});
	}

	exec(message) {

		const discord = require('discord.js');

		const invEmbed = new discord.MessageEmbed()
			.setTitle('**`Use this link to invite me!`**')
			// eslint-disable-next-line quotes, no-inline-comments
			.setDescription(`[Click Here](https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=134728736)`).setColor('RANDOM').setFooter(`${message.author.tag}`); // .setImage('a banner? (optional)');


		message.channel.send({
			embed: {
				title: 'Where do you want me to send the invite to add me to your server?',
				color: 'BLURPLE',
				description: ':one: for DM\n :two: for me to send it here.',
			},
		}).then(inviteMessage => {
			inviteMessage.react('1️⃣');
			inviteMessage.react('2️⃣');

			const filter = (reaction, user) => {
				return (
					['1️⃣', '2️⃣'].includes(reaction.emoji.name) &&
                    user.id === message.author.id
				);
			};

			inviteMessage.awaitReactions(filter, {
				max: 1,
				time: 300000,
				errors: ['time'],
			}).then(collected => {
				const reaction = collected.array()[collected.size - 1];

				if (reaction.emoji.name === '1️⃣') {
					inviteMessage.delete();
					// eslint-disable-next-line no-unused-vars
					message.author.send(invEmbed).catch(err => {
						return message.reply('We had an error sending you the message! Are your dms turned off?');
					});
					message.channel.send('You\'ve got mail!');
				}
				else if (reaction.emoji.name === '2️⃣') {
					inviteMessage.delete();
					message.channel.send(invEmbed);
				}
			});

		});

	}

}

module.exports = InviteCommand;