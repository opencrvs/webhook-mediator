import * as fs from 'fs'
import * as util from 'util'

const get = (secret: string) => {
  try {
    // Swarm secret are accessible within tmpfs /run/secrets dir
    return fs
      .readFileSync(util.format('/run/secrets/%s', secret), 'utf8')
      .trim()
  } catch (e) {
    return false
  }
}

export const HOST = process.env.HOST || '0.0.0.0'
export const PORT = process.env.PORT || 4545
export const WEBHOOK_URL = process.env.WEBHOOK_URL || '' // Insert your webhook URL
export const AUTH_URL = process.env.AUTH_URL || '' // Insert the URL to your OpenCRVS auth service installation
export const CALLBACK_URL = process.env.CALLBACK_URL || '' // Insert your webhooks URL here for Verification Request and Event Notification
export const CLIENT_ID = get('CLIENT_ID') || (process.env.CLIENT_ID as string)
export const CLIENT_SECRET =
  get('CLIENT_SECRET') || (process.env.CLIENT_SECRET as string)
export const SHA_SECRET =
  get('SHA_SECRET') || (process.env.SHA_SECRET as string)
export const DEFAULT_TIMEOUT = 600000
