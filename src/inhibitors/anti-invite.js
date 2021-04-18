const { Inhibitor } = require('klasa');

class AntiInviteInhibitor extends Inhibitor {

	constructor(...args) {
		super(...args, {
			name: 'Anti Link',
			enabled: true,
		});
	}

	async run(message) {
		if (!message.guild || !message.guild.settings.anti_invite) return null;
		if (await message.hasAtLeastPermissionLevel(6)) return null;
		if (!/(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(message.content)) return null;
		return message.delete()
			.catch(err => this.client.emit('log', err, 'error'));
	}
}

module.exports = AntiInviteInhibitor;