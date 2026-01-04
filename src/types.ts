export interface BuildWebhookPayload {
  id: string
  accountName: string
  projectName: string
  buildDetailsPageUrl: string
  parentBuildId?: string
  appId: string
  initiatingUserId: string
  cancelingUserId?: string | null
  platform: 'android' | 'ios'
  status: 'errored' | 'finished' | 'canceled'
  artifacts?: {
    buildUrl?: string
    logsS3KeyPrefix: string
  }
  metadata: {
    appName: string
    username: string
    workflow: 'managed' | 'generic'
    appVersion: string
    appBuildVersion: string
    cliVersion: string
    sdkVersion?: string
    buildProfile: string
    distribution: 'store' | 'internal' | 'simulator'
    appIdentifier: string
    gitCommitHash?: string
    gitCommitMessage?: string
    runtimeVersion?: string
    channel?: string
    releaseChannel?: string
    reactNativeVersion?: string
    trackingContext: Record<string, any>
    credentialsSource: 'remote' | 'local'
    isGitWorkingTreeDirty: boolean
    message?: string
    runFromCI: boolean
  }
  metrics?: {
    memory: number
    buildEndTimestamp: number
    totalDiskReadBytes: number
    buildStartTimestamp: number
    totalDiskWriteBytes: number
    cpuActiveMilliseconds: number
    buildEnqueuedTimestamp: number
    totalNetworkEgressBytes: number
    totalNetworkIngressBytes: number
  }
  error?: {
    message: string
    errorCode: string
  }
  createdAt: string
  enqueuedAt: string
  provisioningStartedAt?: string
  workerStartedAt?: string
  completedAt: string
  updatedAt: string
  expirationDate: string
  priority: 'high' | 'normal' | 'low'
  resourceClass: string
  actualResourceClass: string
  maxRetryTimeMinutes: number
}

export interface SubmitWebhookPayload {
  id: string
  accountName: string
  projectName: string
  submissionDetailsPageUrl: string
  parentSubmissionId?: string
  appId: string
  archiveUrl: string
  initiatingUserId: string
  cancelingUserId?: string | null
  turtleBuildId?: string
  platform: 'android' | 'ios'
  status: 'errored' | 'finished' | 'canceled'
  submissionInfo?: {
    error?: {
      message: string
      errorCode: string
    }
    logsUrl: string
  }
  createdAt: string
  updatedAt: string
  completedAt: string
  maxRetryTimeMinutes: number
}
