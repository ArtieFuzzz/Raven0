const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class MissingPermissionsListener extends Listener {
	constructor() {
		super('missingPermissions', {
			emitter: 'commandHandler',
			event: 'missingPermissions',
		});
	}

	exec(message, command, type, missing) {
		if(type == 'client') {
			const result = missingPermissions(message.guild.me, missing);
			const embed = new MessageEmbed()
				.setColor(this.client.colors['red'])
				.setDescription(`:x: I do not have the following permission(s): \`${result}\` for the command: \`${command}\`. Command execution has halted.`);
			return message.channel.send({ embed });
		}
		else if(type == 'user') {
			const result = missingPermissions(message.member, missing);
			const embed = new MessageEmbed()
				.setColor(this.client.colors['red'])
				.setDescription(`:x: You do not have the following permission(s): \`${result}\` for the command: \`${command}\`. Command execution has halted.`);
			return message.channel.send({ embed });
		}
	}
}

const missingPermissions = (usr, permissions) => {
	// eslint-disable-next-line no-shadow
	const missingPermissions = usr.permissions.missing(permissions)
		.map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);

	return missingPermissions.length > 1 ?
		`${missingPermissions.slice(0, -1).join(', ')} and ${missingPermissions.slice(-1)[0]}` :
		missingPermissions[0];
};

module.exports = MissingPermissionsListener;