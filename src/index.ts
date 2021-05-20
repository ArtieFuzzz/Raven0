import BotClient from './client/BotClient'
import dotenv from 'dotenv'
import Sentry from '@sentry/node'
import os from 'os'
import conf from './config'
import { version as discordVersion } from 'discord.js'
import { version as akairoVersion } from 'discord-akairo'

dotenv.config()

const client = new BotClient()

Sentry.init({
	dsn: conf.sentryURI,
	release: `raven0@${conf.version}`,
	tracesSampleRate: 1.0
})

Sentry.configureScope(scope => {
	scope.setTags({
		host: `${os.hostname()}`,
		'akairo-version': akairoVersion,
		'discord.js-version': discordVersion
	})
})

client.start()
