import mongoose from 'mongoose'

export = mongoose.model('User', new mongoose.Schema({
	userID: { type: Number, required: true },
	registeredAt: { type: Number, default: Date.now() },
	blacklisted: { type: Boolean, default: false },
	commandsRan: { type: Number, default: 0 }
}))
