const RavenClient = require('./lib/RavenClient.js');
const { ShardingManager } = require('kurasuta');
const { Constants, Util } = require('discord.js');
const { join } = require('path');
require('dotenv').config();
const token = process.env.TOKEN;

const customClientOptions = {
	fetchAllMembers: false,
	prefix: process.env.PREFIX,
	createPiecesFolders: false,
	disableMentions: 'everyone',
	disabledCorePieces: ['commands'],
	production: true,
};

const sharderOptions = {
	clientOptions: Util.mergeDefault(Constants.DefaultOptions, customClientOptions),
	client: RavenClient,
	timeout: 90000,
	shardCount: process.env.SPAWN_SHARDS,
	token,
};

const sharder = new ShardingManager(join(__dirname, './lib/ShardManager.js'), sharderOptions);

sharder.spawn();