//Command pulled from: https://github.com/Syrup/kurapika
const { Command } = require('discord-akairo');
const fetch = require('centra');
const qs = require('querystring');

class DocsCommand extends Command {
	constructor() {
		super('docs', {
			aliases: ['docs'],
			args: [
				{
					id: 'docs',
					type: 'string',
					match: 'text',
					limit: 3000,
					prompt: {
						start: msg => `${msg.member} Would you like to search?\nType: <name> <sources>`
					}
				},
				{
				  key: "flag",
				  type: "options"
				}
			],
            description: {
                description: 'Search documentation of discord.js\n*Supported discord-rpc, discord-akairo, discord.js-commando*',
                usage: 'docs <argument> [stable|master|rpc|commando|akairo-master]',
                examples: ['docs client stable']
                }
		});
	}

	async exec(msg, { docs }) {
	  console.log(docs)
		let args = msg.content
		.slice(msg.guild.prefix)
		.trim()
		.split(/ +/)
		.slice(1)

		const SOURCES = [
			'stable',
			'master',
			'rpc',
			'commando',
			'akairo',
			'akairo-master',
			'11.5-dev'
		];
		
		let source = SOURCES.includes(args.slice(-1)[0]) ? args.pop() : 'stable';
		if (source === '11.5-dev') {
			source = `https://raw.githubusercontent.com/discordjs/discord.js/docs/${source}.json`;
		}
		try {
			const queryString = qs.stringify({
				src: source,
				q: docs
			});
			const { body: embed } = await fetch.get(
				`https://djsdocs.sorta.moe/v2/embed?${queryString}`
			);
			if (!embed) {
				return msg.util.reply(
					"I couldn't find the requested information. Maybe look for something that actually exists the next time!"
				);
			}
			return msg.util.send({ embed });
		} catch (e) {
			return msg.util.send(
				`Oh no an error occured :( \`${e.message}\` try again later`
			);
		}
	}
}

module.exports = DocsCommand;