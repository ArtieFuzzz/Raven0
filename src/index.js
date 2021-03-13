const SparrowClient = require('./Client/RavenClient.js');

const client = new SparrowClient({ ownerID: process.env.OWNERID }, { disableMentions: 'everyone', disableEveryone: true, fetchAllMembers: true });
client.login();
