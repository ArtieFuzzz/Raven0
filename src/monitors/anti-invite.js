// Credit goes to [ravy](https://ravy.pink) from [The Aero Team](https://aero.bot)
const { Monitor } = require('klasa');

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, {
			enabled: true,
			ignoreBots: true,
			ignoreSelf: true,
			ignoreEdits: false,
			ignoreOthers: false,
		});

		this.inviteRegex = /(https?:\/\/)?(.*?@)?(www\.)?((discord|invite)\.(gg|li|me|io)|discord(app)?\.com\/invite)\/(\s)?.+/ui;
	}

	async run(msg) {
		// Line 20 edited: mod.anti.invites > anti_invite & msg.exempt removed
		if (!msg.guild || !msg.guild.settings.get('anti_invite')) return;
		if (this.inviteRegex.test(msg.content)) msg.delete();
	}

};
