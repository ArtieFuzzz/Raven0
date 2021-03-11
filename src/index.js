const SparrowClient = require('./Client/SparrowClient.js');

const client = new SparrowClient({ ownerID: process.env.OWNERID }, { disableMentions: 'everyone', disableEveryone: true });
client.login();
