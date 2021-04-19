const { Client } = require('klasa');
const BotColors = require('./util/colors.js');
const { WebhookClient } = require('discord.js');
const { KSoftClient } = require('@ksoft/api');
const yiff_config = require('../Config/yiff.config.js');
const yiff = require('yiff');
require('dotenv').config();

class RavenClient extends Client {

	constructor(...args) {
		super(...args);
		this.colors = BotColors;
		this.shardHook = new WebhookClient(process.env.HOOK_ID, process.env.HOOK_TOKEN);
		this.ksoft = new KSoftClient(process.env.KSOFT_TOKEN);
		this.srod = require('srod-v2');
		this.yiff = new yiff(yiff_config);

		Client.defaultGuildSchema.add('anti_invite', 'boolean', {
			default: false,
			configurable: false,
		});
	}
	async login() {
		require('../Extensions/message.js');

		return super.login(process.env.TOKEN);
	}
}

module.exports = RavenClient;