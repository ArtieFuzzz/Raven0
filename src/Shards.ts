import { ShardingManager } from 'discord.js'
import config from './config'
import { WebhookLogger } from './structures/WebhookLogger'

const Logger = WebhookLogger.instance

const Sharder = new ShardingManager('./index', {
	token: config.clientToken,
	totalShards: 'auto'
})

Sharder.on('shardCreate', async (shard) => {
	Logger.info('[ShardManager]', `Launched Shard #${shard}`)
})
