const { Event } = require('klasa');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'Presence',
			enabled: true,
			event: 'ready',
			emitter: 'client',
			once: true,
		});
	}

	run() {
		this.client.user.setActivity(`Spotify | ${process.env.PREFIX}`, { type: 'LISTENING' });
	}
};