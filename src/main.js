const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler, Command, ClientUtil } = require('discord-akairo');
const { Database } = require('quickmongo');
const chalk = require('chalk');
const BotColors = require('./Util/colors');
require('dotenv').config();

console.log(chalk.yellow('[Starting] Please wait while I start up'));
console.log(chalk.yellow('[Starting] Sparrow V2.8'));

class SparrowClient extends AkairoClient {
	constructor() {
		super({
			ownerID: process.env.OWNERID,
		}, {
			disableMentions: 'everyone',
		});
		console.log(chalk.yellow('[Starting] Loading Commands'));
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
			defaultCooldown: 2000,
			commandUtilLifetime: 300000,
		});
		console.log(chalk.yellow('[Starting] Loading Inhibitors'));
		this.inhibitorHandler = new InhibitorHandler(this, {
			directory: './src/Inhibitors/',
		});
		console.log(chalk.yellow('[Starting] Loading Listeners'));
		this.listenerHandler = new ListenerHandler(this, {
			directory: './src/Listeners/',
		});

		this.db = new Database(process.env.MONGO_URI);
		this.colors = BotColors;
		this.util = new ClientUtil(this);
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
	async start() {
		require('./Extensions/message');

		super.login(process.env.TOKEN);
	}
}

const client = new SparrowClient();
client.start();