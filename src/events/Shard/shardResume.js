const { Event } = require('klasa');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'shardResume',
			enabled: true,
			event: 'shardResume',
			emitter: 'client',
			once: false,
		});
	}

	run(shardID, replayed) {
		this.client.console.log(`[Shards] Shard ${shardID + 1} resumed`, replayed);
	}
};