import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const guildSchema = new Schema({
  // 'id' field must be first - you can name it whatever you want
  id: {
    type: String,
    required: true
  },
  // 'data' field must be second - you can name it whatever you want
  data: {
    type: Object,
    required: true
  }
})

export default model('Guild', guildSchema)
