import { ShardingManager, Shard } from 'discord.js'
import config from './config'
import { WebhookLogger } from './structures/WebhookLogger'

const Logger = WebhookLogger.instance

const Sharder = new ShardingManager('./index.js', {
	token: config.clientToken,
	totalShards: 'auto',
	respawn: true
})

Sharder.on('shardCreate', async (shard: Shard) => {
	Logger.info('[ShardManager]', `Launched Shard #${shard.id + 1}`)
})

Sharder.spawn()