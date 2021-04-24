const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

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

	async run(shardID, replayed) {
		this.client.console.log(`[Shards] Shard ${shardID + 1} resumed`, replayed);

		const hook = await this.client.shardHook;
		if (hook) {
			const embed = new MessageEmbed()
				.setTitle('[Resumed]')
				.setDescription(`Shard ${shardID + 1} is running again!`)
				.setTimestamp();
			hook.send(embed);
		}
	}
};