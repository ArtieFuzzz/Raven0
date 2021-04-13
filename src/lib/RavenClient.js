const { Client } = require('klasa');
const BotColors = require('./util/colors.js');
const { WebhookClient } = require('discord.js');
require('dotenv').config();

class RavenClient extends Client {

	constructor(...args) {
		super(...args);
		this.colors = BotColors;
		this.shardHook = new WebhookClient(process.env.HOOK_ID, process.env.HOOK_TOKEN);
	}
	async login() {
		require('../Extensions/message.js');

		return super.login(process.env.TOKEN);
	}
}

module.exports = RavenClient;