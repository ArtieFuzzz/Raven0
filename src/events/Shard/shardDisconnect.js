const { Event } = require('klasa');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'shardDisconnect',
			enabled: true,
			event: 'shardDisconnect',
			emitter: 'client',
			once: false,
		});
	}

	run(shardID, closeEvent) {
		this.client.console.log(`[Shards - Err!] Shard ${shardID + 1} disconnected!`, closeEvent);
	}
};