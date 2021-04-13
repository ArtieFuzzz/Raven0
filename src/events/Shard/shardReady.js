const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

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

	async run(shardID) {
		this.client.console.log(`[Shards] Running Shard ${shardID + 1}`);

		const hook = await this.client.shardHook;
		if (hook) {
			const embed = new MessageEmbed()
				.setTitle('[Ready]')
				.setDescription(`Shard ${shardID + 1} is ready!`)
				.setTimestamp();
			this.client.shardHook.send(embed);
		}
	}
};