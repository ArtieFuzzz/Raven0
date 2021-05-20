import BotClient from './client/BotClient'
import Sentry from './lib/SentryClient'
import dotenv from 'dotenv'
dotenv.config()

const client = new BotClient()

Sentry()

client.start()
