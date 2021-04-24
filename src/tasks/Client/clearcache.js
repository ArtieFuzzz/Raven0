const { Task } = require('klasa');

class ClearCacheTask extends Task {

	async run() {
		this.client.cache.clear();
	}
	async init() {
		this.client.schedule.create('clearcache', '*/10 * * * *', {
			catchUp: false,
		});
	}

}


module.exports = ClearCacheTask;