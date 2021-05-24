import mongoose from 'mongoose'

export = mongoose.model('Guild', new mongoose.Schema({
	guildID: { type: Number, required: true },
	registeredAt: { type: Number, default: Date.now() },
	data: { type: Object }
}))
