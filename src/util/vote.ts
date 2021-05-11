import c from '@aero/centra'
import { Snowflake } from 'discord.js'

async function CheckVote (user: Snowflake): Promise<Boolean> {
  const data = await c('https://api.ksoft.si/webhook/dbl/check')
    .header('Authorization', `Bearer ${process.env.KSOFT_TOKEN}`)
    .query({ bot: this.client.user.id, user: user })
    .json()

  if (data.voted) return true

  return false
}

async function VoteList (): Promise<Object> {
  const list: Object = await c('https://api.ksoft.si/webhook/dbl/list')
    .header('Authorization', `Bearer ${process.env.KSOFT_TOKEN}`)
    .query({ bot: this.client.user.id })
    .json()

  return list
}

export { CheckVote, VoteList }
