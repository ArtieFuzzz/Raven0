import { Snowflake } from 'discord.js'
import { WebhookLogger } from './structures/WebhookLogger'
import Guild from './models/Guild'
import User from './models/User'

const logger = WebhookLogger.instance

/**
 * @function
 * @param {Snowflake} guildID Guild ID to search for.
 * @returns {Promise<any>} Returns a object
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

/**
 * @function
 * @param {Snowflake} userID U ID to search for.
 * @returns {Promise<any>} Returns a object
 */
export async function getUser (userID: Snowflake): Promise<any> {
	let user = await Guild.findOne({ userID: userID })

	if (user) return user
	else {
		user = new User({ userID: userID })
		await user.save().catch(async err => await logger.error(err))
		return user
	}
}
