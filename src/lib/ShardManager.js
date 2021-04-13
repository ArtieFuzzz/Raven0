const { BaseCluster } = require('kurasuta');
require('dotenv').config();

class Manager extends BaseCluster {
	launch() {
		this.client.login(process.env.TOKEN);
	}
}

module.exports = Manager;