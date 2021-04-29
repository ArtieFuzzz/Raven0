import { Listener } from 'discord-akairo'
import { WebhookLogger } from '../structures/WebhookLogger'

export default class ReadyListener extends Listener {
  logger: WebhookLogger
  constructor () {
    super('mongoReady', {
      emitter: 'client',
      event: 'open',
      category: 'client'
    })
    this.logger = WebhookLogger.instance
  }

  public exec (): void {
    this.client.logger.info(
      'CLIENT',
      'MongoDB connection established!'
    )
  }
}
