import type { BuildWebhookPayload, SubmitWebhookPayload } from './types'

export interface WebhookClient {
  triggerBuild(payload: BuildWebhookPayload): Promise<void>
  triggerSubmit(payload: SubmitWebhookPayload): Promise<void>
}
