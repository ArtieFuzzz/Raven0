import { ShardingManager, Shard, version as discordVersion } from 'discord.js'
import conf from './config'
import { WebhookLogger } from './lib/structures/WebhookLogger'
import { version as akairoVersion } from 'discord-akairo'
import * as Sentry from '@sentry/node'
import os from 'os'

const Logger = WebhookLogger.instance

const Sharder = new ShardingManager(process.cwd() + '/build/' + 'index.js', {
	token: conf.clientToken,
	totalShards: 'auto',
	respawn: true
})

Sentry.init({
	dsn: conf.sentryURI,
	release: `raven0@${conf.version}`,
	tracesSampleRate: 1.0
})

Sentry.configureScope(scope => {
	scope.setTags({
		host: `${os.hostname()}`,
		sharded: true,
		shards: Sharder.totalShards,
		'akairo-version': akairoVersion,
		'discord.js-version': discordVersion
	})
})

Sharder.on('shardCreate', async (shard: Shard) => {
	Logger.info('ShardManager', `Launched Shard #${shard.id + 1}`)
})

Sharder.spawn()
