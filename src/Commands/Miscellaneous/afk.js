const { Command } = require('discord-akairo');

class AFKCommand extends Command {

	constructor() {
		super('afk', {
			aliases: ['afk', 'away'],
			category: 'Miscellaneous',
			args: [
				{
					id: 'reason',
					type: 'string',
					match: 'content',
					prompt: {
						start: 'What is the reason of you being afk?',
						retry: 'Try again! What is the reason of you being afk?',
					},
				},
			],
			description: {
				description: 'Set yourself as afk to inform users that mentioned you!',
				usage: 'afk <reason>',
				examples: ['afk grabbing some chicken', 'afk Watching Thin Air'],
			},
		});
	}
	async exec(message, args) {
		/* Credit to Azrail#4817 from: Dark Studio who originally created this command*/
		/* Edit by: ArtieFuzzz#8298*/
		const alrAfk = await this.client.db.fetch(`afk_${message.author.id}-${message.guild.id}`);

		if (!alrAfk) {
			this.client.db.set(`afk_${message.author.id}-${message.guild.id}`, args.reason || 'None.');
			// eslint-disable-next-line no-unused-vars, handle-callback-err
			message.member.setNickname(`[AFK] ${message.member.nickname ? message.member.nickname : message.member.user.username}`).catch(err => null);
			return message.channel.send(`${message.author}, You are now AFK! Reason: **${args.reason}**`);
		}

		return message.channel.send('You are already afk!');
	}

}

module.exports = AFKCommand;
