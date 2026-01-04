import type { BuildWebhookPayload, SubmitWebhookPayload } from './types'

export function createBuildMessage(payload: BuildWebhookPayload): string {
  const { status, platform, projectName, buildDetailsPageUrl, metadata } =
    payload
  const emoji =
    status === 'finished' ? '✅' : status === 'errored' ? '❌' : '⚠️'
  return `${emoji} **${projectName}** (${platform}) build ${status}
App Version: ${metadata.appVersion}
Details: ${buildDetailsPageUrl}`
}

export function createSubmitMessage(payload: SubmitWebhookPayload): string {
  const {
    status,
    platform,
    projectName,
    submissionDetailsPageUrl,
    submissionInfo,
  } = payload
  const emoji =
    status === 'finished' ? '✅' : status === 'errored' ? '❌' : '⚠️'
  let message = `${emoji} **${projectName}** (${platform}) submission ${status}
Details: ${submissionDetailsPageUrl}`

  if (submissionInfo?.error) {
    message += `\nError: ${submissionInfo.error.message}`
  }

  return message
}
