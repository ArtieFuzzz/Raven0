const { Command } = require('discord-akairo');
const { DiscordSnowflake } = require('@sapphire/snowflake');
const { MessageEmbed } = require('discord.js');
const dayjs = require('dayjs');

class SnowFlakeCommand extends Command {

	constructor() {
		super('snowflake', {
			aliases: ['snowflake', 'genflake', 'gensnowflake', 'gsf'],
			category: 'Owner',
			description: {
				usage: 'snowflake',
				examples: ['snowflake', 'genflake', 'gensnowflake'],
				description: 'Generates a snowflake (Not a discord snowflake).',
			},
			ownerOnly: true,
		});
	}

	async exec(message) {
		try {
			const snowflake = DiscordSnowflake.generate();
			const flake = DiscordSnowflake.deconstruct(snowflake);

			const embed = new MessageEmbed()
				.setTitle('SnowFlake Generated!')
				.addFields(
					{ name: 'SnowFlake', value: flake.id },
					{ name: 'Created', value: dayjs(1615594104887).format('dddd - MMMM - YYYY') },
					{ name: 'WorkerID', value: flake.workerID },
					{ name: 'ProcessID', value: flake.processID },
					{ name: 'Epoch', value: flake.epoch },
				);
			message.channel.send(embed);
		}
		catch (err) {
			return message.channel.send(err.message);
		}
	}

}

module.exports = SnowFlakeCommand;
