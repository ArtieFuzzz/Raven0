const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

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

	async run(shardID) {
		this.client.console.log(`[Shards] Shard ${shardID + 1} reconnecting`);

		const hook = await this.client.shardHook.send;
		if (hook) {
			const embed = new MessageEmbed()
				.setTitle('[Reconnecting]')
				.setDescription(`Shard ${shardID + 1} is reconnecting!`)
				.setTimestamp();
			hook.send(embed);
		}
	}
};