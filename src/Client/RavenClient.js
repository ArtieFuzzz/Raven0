const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler, Command } = require('discord-akairo');
const { Database } = require('quickmongo');
const { yellow } = require('chalk');
const { version } = require('../../package.json');
const BotColors = require('../Util/colors.js');
const RavenClientUtil = require('./RavenClientUtil.js');
const chalk = require('chalk');
require('dotenv').config();

console.log(yellow('[Starting] Please wait while I start up'));
console.log(yellow('[Starting] Raven ' + 'V ' + chalk.hex('#5e62ff')(version)));

class SparrowClient extends AkairoClient {
	constructor(...args) {
		super(...args);
		console.log(yellow('[Starting] Loading Commands'));
		this.commandHandler = new CommandHandler(this, {
			directory: './src/Commands/',
			prefix: process.env.PREFIX,
			handleEdits: true,
			commandUtil: true,
			classToHandle: Command,
			argumentDefaults: {
				prompt: {
					modifyStart: (message, str) => `${message.author}, ${str}\n\nType: \`cancel\` to cancel the command...`,
					modifyRetry: (message, str) => `${message.author}, ${str}\n\nType: \`cancel\` to cancel the command...`,
					cancel: 'You have cancelled the command successfully.',
					timeout: 'Your time has ran out. Command was cancelled...',
					ended: 'You took too many tries. Command was cancelled...',
					retries: 4,
					time: 30000,
				},
				otherwise: '',
			},
			ignoreCooldown: this.ownerID,
			ignorePermissions: this.ownerID,
			automateCategories: true,
			commandUtilLifetime: 300000,
		});
		console.log(yellow('[Starting] Loading Inhibitors'));
		this.inhibitorHandler = new InhibitorHandler(this, {
			directory: './src/Inhibitors/',
		});
		console.log(yellow('[Starting] Loading Listeners'));
		this.listenerHandler = new ListenerHandler(this, {
			directory: './src/Listeners/',
		});

		this.db = new Database(process.env.MONGO_URI);
		this.colors = BotColors;
		this.util = new RavenClientUtil(this);
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.commandHandler.loadAll();
		this.inhibitorHandler.loadAll();
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
			process: process,
		});
		this.listenerHandler.loadAll();
	}
	async login() {
		require('../Extensions/message.js');

		return super.login(process.env.TOKEN);
	}
}

module.exports = SparrowClient;
