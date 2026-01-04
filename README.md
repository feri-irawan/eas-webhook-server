# eas-webhook-server

This project is a webhook server for [Expo](https://expo.dev) that handles build and submit webhooks.

You can deploy it to any server that supports Node.js like Vercel.

## Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    bun install
    ```
3.  Run the development server:
    ```bash
    bun run dev
    ```
4.  Deploy to Vercel
    ```bash
    vercel --prod
    ```

## Configuration

Set the following environment variables:

- `SECRET_WEBHOOK_KEY`: The secret key defined when creating the webhook in EAS (`eas webhook:create`).
- `DISCORD_WEBHOOK_URL`: The webhook URL for your Discord channel (if using the Discord client).

## Extensibility

This project supports multiple webhook clients. To add a new client (e.g., Slack, Email):

1.  Create a new file in `src/clients/` (e.g., `src/clients/slack.ts`).
2.  Implement the `WebhookClient` interface:

    ```typescript
    import { WebhookClient } from '../interfaces'
    import { BuildWebhookPayload, SubmitWebhookPayload } from '../types'

    export class SlackClient implements WebhookClient {
      async triggerBuild(payload: BuildWebhookPayload): Promise<void> {
        // Implement logic to send build notification
      }

      async triggerSubmit(payload: SubmitWebhookPayload): Promise<void> {
        // Implement logic to send submit notification
      }
    }
    ```

3.  Register your client in `src/clients/index.ts`:

    ```typescript
    import { SlackClient } from './slack'
    // ... other imports

    export const clients: WebhookClient[] = [
      new DiscordClient(),
      new SlackClient(), // Add your new client here
    ]
    ```

## Example payloads

We use example payload from [Webhooks - Expo documentation](https://docs.expo.dev/eas/webhooks/#webhook-payload).

### Build webhook payload

```json
{
  "id": "147a3212-49fd-446f-b4e3-a6519acf264a",
  "accountName": "dsokal",
  "projectName": "example",
  "buildDetailsPageUrl": "https://expo.dev/accounts/dsokal/projects/example/builds/147a3212-49fd-446f-b4e3-a6519acf264a",
  "parentBuildId": "75ac0be7-0d90-46d5-80ec-9423fa0aaa6b", // available for build retries
  "appId": "bc0a82de-65a5-4497-ad86-54ff1f53edf7",
  "initiatingUserId": "d1041496-1a59-423a-8caf-479bb978203a",
  "cancelingUserId": null, // available for canceled builds
  "platform": "android", // or "ios"
  "status": "errored", // or: "finished", "canceled"
  "artifacts": {
    "buildUrl": "https://expo.dev/artifacts/eas/wyodu9tua2ZuKKiaJ1Nbkn.aab", // available for successful builds
    "logsS3KeyPrefix": "production/f9609423-5072-4ea2-a0a5-c345eedf2c2a"
  },
  "metadata": {
    "appName": "example",
    "username": "dsokal",
    "workflow": "managed",
    "appVersion": "1.0.2",
    "appBuildVersion": "123",
    "cliVersion": "0.37.0",
    "sdkVersion": "41.0.0",
    "buildProfile": "production",
    "distribution": "store",
    "appIdentifier": "com.expo.example",
    "gitCommitHash": "564b61ebdd403d28b5dc616a12ce160b91585b5b",
    "gitCommitMessage": "Add home screen",
    "runtimeVersion": "1.0.2",
    "channel": "default", // available for EAS Update
    "releaseChannel": "default", // available for legacy updates
    "reactNativeVersion": "0.60.0",
    "trackingContext": {
      "platform": "android",
      "account_id": "7c34cbf1-efd4-4964-84a1-c13ed297aaf9",
      "dev_client": false,
      "project_id": "bc0a82de-65a5-4497-ad86-54ff1f53edf7",
      "tracking_id": "a3fdefa7-d129-42f2-9432-912050ab0f10",
      "project_type": "managed",
      "dev_client_version": "0.6.2"
    },
    "credentialsSource": "remote",
    "isGitWorkingTreeDirty": false,
    "message": "release build", // message attached to the build
    "runFromCI": false
  },
  "metrics": {
    "memory": 895070208,
    "buildEndTimestamp": 1637747861168,
    "totalDiskReadBytes": 692224,
    "buildStartTimestamp": 1637747834445,
    "totalDiskWriteBytes": 14409728,
    "cpuActiveMilliseconds": 12117.540078,
    "buildEnqueuedTimestamp": 1637747792476,
    "totalNetworkEgressBytes": 355352,
    "totalNetworkIngressBytes": 78781667
  },
  // available for failed builds
  "error": {
    "message": "Unknown error. Please see logs.",
    "errorCode": "UNKNOWN_ERROR"
  },
  "createdAt": "2021-11-24T09:53:01.155Z",
  "enqueuedAt": "2021-11-24T09:53:01.155Z",
  "provisioningStartedAt": "2021-11-24T09:54:01.155Z",
  "workerStartedAt": "2021-11-24T09:54:11.155Z",
  "completedAt": "2021-11-24T09:57:42.715Z",
  "updatedAt": "2021-11-24T09:57:42.715Z",
  "expirationDate": "2021-12-24T09:53:01.155Z",
  "priority": "high", // or: "normal", "low"
  "resourceClass": "android-n2-1.3-12",
  "actualResourceClass": "android-n2-1.3-12",
  "maxRetryTimeMinutes": 3600 // max retry time for failed/canceled builds
}
```

### Submit webhook payload

```json
{
  "id": "0374430d-7776-44ad-be7d-8513629adc54",
  "accountName": "dsokal",
  "projectName": "example",
  "submissionDetailsPageUrl": "https://expo.dev/accounts/dsokal/projects/example/builds/0374430d-7776-44ad-be7d-8513629adc54",
  "parentSubmissionId": "75ac0be7-0d90-46d5-80ec-9423fa0aaa6b", // available for submission retries
  "appId": "23c0e405-d282-4399-b280-5689c3e1ea85",
  "archiveUrl": "http://archive.url/abc.apk",
  "initiatingUserId": "7bee4c21-3eaa-4011-a0fd-3678b6537f47",
  "cancelingUserId": null, // available for canceled submissions
  "turtleBuildId": "8c84111e-6d39-449c-9895-071d85fd3e61", // available when submitting a build from EAS
  "platform": "android", // or "ios"
  "status": "errored", // or: "finished", "canceled"
  "submissionInfo": {
    // available for failed submissions
    "error": {
      "message": "Android version code needs to be updated",
      "errorCode": "SUBMISSION_SERVICE_ANDROID_OLD_VERSION_CODE_ERROR"
    },
    "logsUrl": "https://submission-service-logs.s3-us-west-1.amazonaws.com/production/submission_728aa20b-f7a9-4da7-9b64-39911d427b19.txt"
  },
  "createdAt": "2021-11-24T10:15:32.822Z",
  "updatedAt": "2021-11-24T10:17:32.822Z",
  "completedAt": "2021-11-24T10:17:32.822Z",
  "maxRetryTimeMinutes": 3600 // max retry time for failed/canceled submissions
}
```
