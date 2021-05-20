import mongoose from 'mongoose'

export = mongoose.model('Guild', new mongoose.Schema({
	guildID: Number,
	data: { type: Object }
}))
