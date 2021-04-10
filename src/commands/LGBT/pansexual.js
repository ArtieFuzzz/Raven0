const { Command } = require('klasa');

class PansexualCommand extends Command {
	constructor(...args) {
		super(...args, {
			usage: '[user:user]',
		});
	}

	async run(message, [user = message.author]) {

		const av = user.displayAvatarURL({ format: 'jpg', size: 2048 });
		const wait = await message.channel.send('Please wait as this may take a moment');

		await message.channel.send({ files: [`https://api.ravy.lgbt/circle?image=${av}&type=pansexual`] });
		wait.delete();
	}
}

module.exports = PansexualCommand;