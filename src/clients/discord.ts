import axios from 'axios'
import type { WebhookClient } from '../interfaces'
import type { BuildWebhookPayload, SubmitWebhookPayload } from '../types'
import { createBuildMessage, createSubmitMessage } from '../messages'

export class DiscordClient implements WebhookClient {
  async triggerBuild(payload: BuildWebhookPayload): Promise<void> {
    const message = createBuildMessage(payload)
    await this.sendNotification(message)
  }

  async triggerSubmit(payload: SubmitWebhookPayload): Promise<void> {
    const message = createSubmitMessage(payload)
    await this.sendNotification(message)
  }

  private async sendNotification(message: string): Promise<void> {
    const url = process.env.DISCORD_WEBHOOK_URL
    if (!url) {
      console.error('DISCORD_WEBHOOK_URL environment variable is not set.')
      return
    }

    try {
      await axios.post(url, {
        content: message,
      })
    } catch (error) {
      console.error('Failed to send Discord notification:', error)
    }
  }
}
