const { Command } = require('discord-akairo');
const snowflakey = require('snowflakey');

class SnowFlakeCommand extends Command {

	constructor() {
		super('snowflake', {
			aliases: ['snowflake', 'genflake', 'gensnowflake'],
			category: 'Owner',
			description: {
				usage: 'snowflake',
				examples: ['snowflake', 'genflake', 'gensnowflake'],
				description: 'Generates a snowflake (Not a discord snowflake).'
			},
			ownerOnly: true
		});
	}

	async exec(message) {
		const Worker = new snowflakey.Worker({
			name: 'Sparrow',
			epoch: 1420070400000,
			workerId: process.env.CLUSTER_ID || 31,
			// eslint-disable-next-line no-undefined
			processId: process.pid || undefined,
			workerBits: 8,
			processBits: 0,
			incrementBits: 14
		});
		try {
			const flake = Worker.generate();
			message.channel.send(`Created Snowflake ${flake}\nCreation Date: ${snowflakey.lookup(flake, Worker.options.epoch)}\nDeconstructed: ${Worker.deconstruct(flake).timestamp.valueOf()}`);
		} catch (err) {
			return message.channel.send(err.message);
		}
	}

}

module.exports = SnowFlakeCommand;
