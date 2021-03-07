const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const api = require('novelcovid');

class CoronaCommand extends Command {

	constructor() {
		super('corona', {
			aliases: ['corona', 'covid'],
			category: 'Miscellaneous',
			args: [
				{
					id: 'country',
					type: 'string',
					match: 'content'
				} ],
			description: {
				usage: 'corona <Country>',
				examples: ['corona usa', 'corona china'],
				description: 'Get covid stats.'
			}
		});
	}

	async exec(message, args) {
		api.settings({ baseUrl: 'https://disease.sh' });

		try {
			if (!args.country) {
				const res = await api.all();
				const embed = new MessageEmbed()
					.setTitle('Global - COVID 19 Stats')
					.addFields({ name: 'Cases', value: res.cases },
						{ name: 'Today Cases', value: res.todayCases },
						{ name: 'Critical Cases', value: res.critical },
						{ name: 'Acitve Cases', value: res.active },
						{ name: 'Deaths', value: res.deaths },
						{ name: 'Today Deaths', value: res.todayDeaths },
						{ name: 'Recovered', value: res.recovered },
						{ name: 'Today Recovered', value: res.todayRecovered })
					.setFooter('Source: disease.sh');
				message.channel.send(embed);
			} else if (args.country) {
				const res = await api.countries({ country: args.country });
				const embed = new MessageEmbed()
					.setTitle(`${res.country} - COVID 19 Stats`)
					.setImage(res.countryInfo.flag)
					.addFields({ name: 'Cases', value: res.cases },
						{ name: 'Today Cases', value: res.todayCases },
						{ name: 'Critical Cases', value: res.critical },
						{ name: 'Acitve Cases', value: res.active },
						{ name: 'Deaths', value: res.deaths },
						{ name: 'Today Deaths', value: res.todayDeaths },
						{ name: 'Recovered', value: res.recovered },
						{ name: 'Today Recovered', value: res.todayRecovered })
					.setFooter('Source: disease.sh');
				message.channel.send(embed);
			}
		} catch (err) {
			message.channel.send(err.message);
		}
	}

}

module.exports = CoronaCommand;
