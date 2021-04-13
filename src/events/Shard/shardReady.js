const { Event } = require('klasa');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'shardReady',
			enabled: true,
			event: 'shardReady',
			emitter: 'client',
			once: false,
		});
	}

	run(shardID) {
		this.client.console.log(`[Shards] Running Shard ${shardID + 1}`);
	}
};