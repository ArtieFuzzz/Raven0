import { Listener } from 'discord-akairo'
import { Guild } from 'discord.js'
import { WebhookLogger } from '../lib/structures/WebhookLogger'

export default class GuildDeleteListener extends Listener {
	logger: WebhookLogger
	constructor () {
		super('guildDelete', {
			emitter: 'client',
			event: 'guildDelete',
			category: 'client'
		})
		this.logger = WebhookLogger.instance
	}

	public exec (guild: Guild): void {
		this.logger.info('GUILD LEAVE', `${this.client.user.tag} has left ${guild.name} (${guild.id})`)
	}
}
