module.exports = {

	duration: function duration(ms) {
		const sec = Math.floor(ms / 1000 % 60).toString();
		const min = Math.floor(ms / (1000 * 60) % 60).toString();
		const hrs = Math.floor(ms / (1000 * 60 * 60) % 60).toString();
		const days = Math.floor(ms / (1000 * 60 * 60 * 24) % 60).toString();
		return `\`${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, and ${sec.padStart(2, '0')} seconds\``;
	},

	generateKey() {
		const characters = 'ABCEFGHJKLNPQRSTUWXYZ1245780';
		let output = '';

		for (let i = 0; i < 5; i += 1) {
			for (let y = 0; y < 4; y += 1) {
				// eslint-disable-next-line no-mixed-operators
				const random = Math.floor(Math.random() * 35 + 1);
				const char = characters.charAt(random);
				output += char;
			}

			if (i !== 5) output += '-';
		}

		return output;
	},

	longDate(date) {
		return new Date(date).toLocaleString('en-GB', { dateStyle: 'full' });
	},

	shortDate(date) {
		return new Intl.DateTimeFormat('en-GB').format(date);
	},

	trim(str, max) {
		if (!str) throw new TypeError('Trim Function Error', 'Must define the string to trim');
		if (!max) throw new TypeError('Trim Function Error', 'Must define how much to trim');
		// eslint-disable-next-line no-unused-expressions
		str.length > max ? `${str.slice(0, max, -3)}...` : str;
	},

	cleanCode(text) {
		// eslint-disable-next-line require-unicode-regexp
		if (typeof text === 'string') return text.replace(/`/g, `\`${ String.fromCharCode(8203)}`).replace(/@/g, `@${ String.fromCharCode(8203)}`);
		return text;
	},

	formatName(str) {
		return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
	},
};
