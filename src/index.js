const RavenClient = require('./lib/RavenClient.js');
require('dotenv').config();

const client = new RavenClient({
	fetchAllMembers: false,
	prefix: process.env.PREFIX,
	createPiecesFolders: false,
},
{
	disableMentions: 'everyone',
	disableEveryone: true,
	fetchAllMembers: true });

client.login();