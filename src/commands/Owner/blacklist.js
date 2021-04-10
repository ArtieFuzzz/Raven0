/*
Example from https://github.com/dirigeants/klasa/tree/master/src/commands
Licensed under the MIT License
*/
const { Command } = require('klasa');
const { User } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 10,
			description: language => language.get('COMMAND_BLACKLIST_DESCRIPTION'),
			usage: '<User:user|Guild:guild|guild:str> [...]',
			usageDelim: ' ',
			guarded: true,
		});

		this.terms = ['usersAdded', 'usersRemoved', 'guildsAdded', 'guildsRemoved'];
	}

	async run(message, usersAndGuilds) {
		const changes = [[], [], [], []];
		const queries = [[], []];

		for (const userOrGuild of new Set(usersAndGuilds)) {
			const type = userOrGuild instanceof User ? 'user' : 'guild';
			if (this.client.settings.get(`${type}Blacklist`).includes(userOrGuild.id || userOrGuild)) {
				changes[this.terms.indexOf(`${type}sRemoved`)].push(userOrGuild.name || userOrGuild.username || userOrGuild);
			}
			else {
				changes[this.terms.indexOf(`${type}sAdded`)].push(userOrGuild.name || userOrGuild.username || userOrGuild);
			}
			queries[Number(type === 'guild')].push(userOrGuild.id || userOrGuild);
		}

		await this.client.settings.update([['userBlacklist', queries[0]], ['guildBlacklist', queries[1]]]);
		return message.sendLocale('COMMAND_BLACKLIST_SUCCESS', changes);
	}

};