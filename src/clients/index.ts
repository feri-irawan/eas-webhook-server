import { DiscordClient } from './discord'
import type { WebhookClient } from '../interfaces'

export const clients: WebhookClient[] = [new DiscordClient()]
