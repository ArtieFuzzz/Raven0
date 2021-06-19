import { Snowflake, User, Guild } from 'discord.js'
import { WebhookLogger } from './structures/WebhookLogger'
import GuildModel from './models/Guild'
import UserModel from './models/User'

const logger = WebhookLogger.instance

/**
 * @function
 * @param {Snowflake} guildID Guild ID to search for.
 * @returns {Promise<any>} Returns a object
 */
export async function getGuild (guildID: Guild | Snowflake): Promise<any> {
	const guild = await GuildModel.findOne({ guildID: guildID })

	if (guild) return guild
	else {
		const Guild = new GuildModel({ guildID: guildID })
		await Guild.save().catch(async err => await logger.error(err))
		return Guild
	}
}

/**
 * @function
 * @param {Snowflake} userID User ID to search for.
 * @returns {Promise<any>} Returns a object
 */
export async function getUser (userID: User | Snowflake): Promise<any> {
	const user = await UserModel.findOne({ userID: userID })

	if (user) return user
	else {
		const User = new UserModel({ userID: userID })
		await User.save().catch(async err => await logger.error(err))
		return User
	}
}
