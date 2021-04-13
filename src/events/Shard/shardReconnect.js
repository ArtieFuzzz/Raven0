const { Event } = require('klasa');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'shardReconnect',
			enabled: true,
			event: 'shardReconnect',
			emitter: 'client',
			once: false,
		});
	}

	run(shardID) {
		this.client.console.log(`[Shards] Shard ${shardID + 1} reconnecting`);
	}
};