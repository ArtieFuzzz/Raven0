// Credit goes to [ravy](https://ravy.pink) from [The Aero Team](https://aero.bot)
const { Monitor } = require('klasa');
const util = require('../lib/util/util.js');

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, {
			enabled: true,
			ignoreBots: true,
			ignoreSelf: true,
			ignoreEdits: true,
			ignoreOthers: false,
		});
	}

	async run(msg) {
		// Line 19 ediited: social.enabled > social
		if (!msg.guild || !msg.guild.settings.get('social') || !msg.guild.me.permissions.has(['SEND_MESSAGES'])) return;
		// cache
		const key = `${msg.guild.id}.${msg.author.id}`;
		if (this.cache.has(key)) return;
		this.cache.add(key);
		setTimeout(() => this.cache.delete(key), 45 * 1000);

		// generate new xp
		const increment = util.random(3, 8);
		const newXP = msg.author.settings.get('points') + increment;
		const newLevel = msg.author.settings.get('level') + 1;
		const xpNeeded = this.xpNeeded(newLevel);

		await msg.author.settings.sync();

		if (newXP >= xpNeeded) {
			await msg.author.settings.update([['points', newXP - xpNeeded], ['level', newLevel]]);
			if (msg.guild.settings.get('social.levelupMessages')) {
				await msg.channel.send(util.randomArray(msg.language.get('LEVEL_MESSAGES'))
					.replace(/{level}/g, newLevel).replace(/{user}/g, msg.author.username));
			}
		}
		else {
			await msg.author.settings.update('points', newXP);
		}
	}

	xpNeeded(level) {
		/*
		 * Fancy curve; makes intervals of 5 levels in which the exp slowly increase, then a big jump.
		 * https://www.desmos.com/calculator/e9vblu1gwf
		 * https://i.imgur.com/4geGBzs.png
		 */
		/* eslint-disable no-mixed-operators */
		/* eslint-disable id-length */
		const f = x => 100 + Math.min(Math.max(0, 2 * (10 * (((x - 5) / 10 - Math.floor(1 / 2 + (x - 5) / 10)) ** 2) + 10 * Math.floor(x / 10) + x - 2.5)), 2000);
		return Math.ceil(f(level));
	}

	async init() {
		this.cache = new Set();
	}

};
