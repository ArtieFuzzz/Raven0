const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

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

		const hook = this.client.shardHook;
		if (hook) {
			const embed = new MessageEmbed()
				.setTitle('[Err!]')
				.setDescription(`Shard ${shardID + 1} disconnected!`, closeEvent)
				.setTimestamp();
			hook.send(embed);
		}
	}
};