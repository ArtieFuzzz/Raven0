const { ClientUtil } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

/* Original https://github.com/Syrup/kurapika/blob/master/core/KurapikaClient.js Licensed Under The MIT License.*/
class SparrowClientUtil extends ClientUtil {
	constructor(client) {
		super(client);

		// eslint-disable-next-line no-self-assign
		this.getMember = this.getMember;
	}

	embed() {
		return new MessageEmbed().setColor('#99AAB5');
	}

	durationToMillis(dur) {
		return (
			dur
				.split(':')
				.map(Number)
				.reduce((acc, curr) => curr + acc * 60) * 1000
		);
	}

	chunk(arr, size) {
		const temp = [];
		for (let i = 0; i < arr.length; i += size) {
			temp.push(arr.slice(i, i + size));
		}
		return temp;
	}

	isValidURL(url) {
		return /^https?:\/\/((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i.test(
			url,
		);
	}

	shuffleArray(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	async getMember(message, toFind = '') {
		toFind = toFind.toLowerCase();

		let target = message.guild.members.cache.get(toFind);

		if (!toFind) {
			target = message.member;
		}

		if (!target && message.mentions.members) {target = message.mentions.members.first();}

		if (!target && toFind) {
			target = message.guild.members.cache.find(member => {
				return (
					member.displayName.toLowerCase().includes(toFind) ||
					member.user.tag.toLowerCase().includes(toFind)
				);
			});
		}

		if (!target) {
			return message.channel.send({
				embed: {
					description: 'User Not Found',
					color: 'RED',
				},
			});
		}

		return target;
	}

	getChannel(guild, channel, caseSensitive, wholeWord) {
		const ch = parseInt(channel);

		if(isNaN(ch)) {
			return this.resolveChannel(channel, guild.channels.cache, caseSensitive, wholeWord);
		}
		else {
			return guild.channels.cache.get(channel);
		}
	}
}

module.exports = SparrowClientUtil;