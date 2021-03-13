/* eslint-disable no-undef */
const { Command } = require('discord-akairo');
const { DiscordSnowflake } = require('@sapphire/snowflake');
const { MessageEmbed } = require('discord.js');

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
		const snowflake = DiscordSnowflake.generate();
		const flake = DiscordSnowflake.deconstruct(snowflake);

		const embed = new MessageEmbed()
			.setTitle('SnowFlake Generated!')
			.addFields(
				{ name: 'SnowFlake', value: flake.id },
				{ name: 'Timestamp', value: flake.timestamp },
				{ name: 'WorkerID', value: flake.workerID },
				{ name: 'ProcessID', value: flake.processID },
				{ name: 'Epoch', value: flake.epoch },
			)
			.setFooter('Use this to convert your Timestamp: https://www.epochconverter.com/');
		message.channel.send(embed);
	}

}

module.exports = SnowFlakeCommand;
