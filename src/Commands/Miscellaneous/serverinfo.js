const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone',
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ︵ヽ(`□´)ﾉ︵ ┻━┻',
};

class ServerInfoCommand extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['server', 'guild', 'guildinfo'],
			bucket: 3,
			cooldown: 3,
		});
	}

	run(message) {
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;


		const embed = new MessageEmbed()
			.setDescription(`**Guild information for _${message.guild.name}_**`)
			.setColor('0xC76CF5')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('General:', [
				`** Name:** ${message.guild.name}`,
				`** ID:** ${message.guild.id}`,
				`** Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
				`** Region:** ${message.guild.region}`,
				`** Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
				`** Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
				`** Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
				`** Time Created:** ${dayjs(message.guild.createdTimestamp).format('hh:mm A')} - ${dayjs(message.guild.createdTimestamp).format('DD/MM/YY')} - ${dayjs(message.guild.createdTimestamp).fromNow(true)}`,
				'\u200b',
			])
			.addField('Statistics:', [
				`** Roles:** ${roles.length}`,
				`** Emojis:** ${emojis.size}`,
				`** Regular Emojis:** ${emojis.filter(emoji => !emoji.animated).size}`,
				`** Animated Emojis:** ${emojis.filter(emoji => emoji.animated).size}`,
				`** Members Count:** ${message.guild.memberCount}`,
				`** Human:** ${members.filter(member => !member.user.bot).size}`,
				`** Bots:** ${members.filter(member => member.user.bot).size}`,
				`** Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
				`** Voice Channel:** ${channels.filter(channel => channel.type === 'voice').size}`,
				`** Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,

			], true)
			.addField('Presence:', [
				`** Online:** ${members.filter(member => member.presence.status === 'online').size}`,
				`** Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
				`** Do not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
				`** Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
			], true)

			.addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? trimArray(roles) : 'None')
			.setTimestamp();
		message.channel.send(embed);
	}

}

function trimArray(arr, maxLen = 10) {
	if (arr.length > maxLen) {
		const len = arr.length - maxLen;
		// eslint-disable-next-line no-param-reassign
		arr = arr.slice(0, maxLen);
		arr.push(`${len} more...`);
	}
	return arr;
}

module.exports = ServerInfoCommand;
