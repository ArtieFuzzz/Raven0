const { Task } = require('klasa');

class ClearCacheTask extends Task {

	async run() {
		this.client.cache.clear();
	}
	async init() {
		this.client.schedule.create('clearcache', '*/5 * * * *');
	}

}


module.exports = ClearCacheTask;