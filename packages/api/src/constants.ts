import { readFileSync } from 'fs'

export const HOST = process.env.HOST || '0.0.0.0'
export const PORT = process.env.PORT || 4545
export const WEBHOOK_URL = process.env.WEBHOOK_URL || '' // Insert your webhook URL
export const AUTH_URL = process.env.AUTH_URL || '' // Insert the URL to your OpenCRVS auth service installation
export const CALLBACK_URL = process.env.CALLBACK_URL || '' // Insert your webhooks URL here for Verification Request and Event Notification

export const DEFAULT_TIMEOUT = 600000
export const SHA_SECRET = process.env.SHA_SECRET_PATH
  ? readFileSync(process.env.SHA_SECRET_PATH).toString()
  : ''
export const CLIENT_SECRET = process.env.CLIENT_SECRET_PATH
  ? readFileSync(process.env.CLIENT_SECRET_PATH).toString()
  : ''
export const CLIENT_ID = process.env.CLIENT_ID_PATH
  ? readFileSync(process.env.CLIENT_ID_PATH).toString()
  : ''
