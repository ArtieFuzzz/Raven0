import mongoose from 'mongoose'

export = mongoose.model('Guild', new mongoose.Schema({
  GuildID: Number,
  data: { type: Object }
}))
