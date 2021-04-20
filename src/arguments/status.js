const { Argument } = require('klasa');

class StatusArgument extends Argument {

	constructor(...args) {
		super(...args, { aliases: ['cmd'] });
	}

	run(arg, message) {
		const status = String(arg).toLowerCase();
		if (status === 'enable') return status;
		if (status === 'disable') return status;
		throw message.channel.send('Must either be enable or disable');
	}

}

module.exports = StatusArgument;