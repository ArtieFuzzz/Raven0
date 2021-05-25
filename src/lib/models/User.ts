import mongoose from 'mongoose'

export = mongoose.model('User', new mongoose.Schema({
	userID: { type: Number, required: true },
	registeredAt: { type: Number, default: Date.now() },
	data: {
		type: Object,
		default: {
			blacklist: false
		}
	}
}))
