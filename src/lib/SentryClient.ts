import { version as discordVersion } from 'discord.js'
import { version as akairoVersion } from 'discord-akairo'
import conf from '../config'
import Sentry from '@sentry/node'
import { WebhookLogger } from './structures/WebhookLogger'
import os from 'os'

const logger = WebhookLogger.instance

export default async function init (): Promise<any> {
	if (!conf.sentryURI) return await logger.error('Sentry', 'A Sentry URI was not set in the main.json file')
	if (conf.sentryURI) return await logger.info('Sentry', 'Starting!')

	Sentry.init({
		dsn: conf.sentryURI,
		release: `raven0@${conf.version}`
	})

	Sentry.configureScope(scope => {
		scope.setTags({
			host: `${os.hostname()}`,
			'akairo-version': akairoVersion,
			'discord.js-version': discordVersion
		})
	})
}
