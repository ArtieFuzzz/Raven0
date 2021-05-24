import { Snowflake } from 'discord.js'
import { WebhookLogger } from './structures/WebhookLogger'
import Guild from './models/Guild'

const logger = WebhookLogger.instance

/**
 * @function
 * @param {Snowflake} guildID Guild ID to search for.
 * @returns {Promise<string>} Returns a string
 */
export async function getGuild (guildID: Snowflake): Promise<any> {
	let guild = await Guild.findOne({ guildID: guildID })

	if (guild) return guild
	else {
		guild = new Guild({ guildID: guildID })
		await guild.save().catch(async err => await logger.error(err))
		return guild
	}
}
