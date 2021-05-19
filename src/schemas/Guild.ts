import mongoose from 'mongoose'
import { Snowflake } from 'discord.js'

export = mongoose.model('Guild', new mongoose.Schema({
  GuildID: Number,
  data: { type: Object }
}))
