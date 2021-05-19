import mongoose from 'mongoose'

export = mongoose.model('User', new mongoose.Schema({
	userID: Number,
	data: { type: Object }
}))
