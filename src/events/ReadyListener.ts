import { Listener } from 'discord-akairo'
import EventEmitterSingleton from '../structures/EventEmitterSingleton'
import { WebhookLogger } from '../structures/WebhookLogger'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../package.json')

export default class ReadyListener extends Listener {
	logger: WebhookLogger
	eventEmitter: EventEmitterSingleton

	constructor () {
		super('ready', {
			emitter: 'client',
			event: 'ready',
			category: 'client'
		})
		this.logger = WebhookLogger.instance
		this.eventEmitter = EventEmitterSingleton.instance
	}

	public exec (): void {
		const users = this.client.users.cache.size
		const channels = this.client.channels.cache.size
		const guilds = this.client.guilds.cache.size
		this.logger.info(
			'CLIENT',
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			`${this.client.user.tag} logged in with ${users} users, in ${channels} channels of ${guilds} guilds. Version: ${pkg.version}`
		)
		this.eventEmitter.emit('changeStatus')
	}
}
