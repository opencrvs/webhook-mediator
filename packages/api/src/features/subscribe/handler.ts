import * as Hapi from '@hapi/hapi'
import { WEBHOOK_URL, CALLBACK_URL, SHA_SECRET } from '@api/constants'
import fetch from 'node-fetch'
import { logger } from '@api/logger'
import { getOpencrvsAuthToken } from '@api/authToken/opencrvsAuthToken'

export default async function subscribeHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const authToken = await getOpencrvsAuthToken()
  if (!authToken) {
    throw new Error('Cannot create token')
  }
  logger.info('Subscribe Handler - Received Auth Token')
  const birthSubscriptionResponse = await fetch(WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({
      hub: {
        callback: CALLBACK_URL,
        mode: 'subscribe',
        secret: SHA_SECRET,
        topic: 'BIRTH_REGISTERED'
      }
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then((response) => {
      return response
    })
    .catch((error) => {
      return Promise.reject(new Error(` request failed: ${error.message}`))
    })
  logger.info(
    `This is birthSubscriptionResponse: ${JSON.stringify(
      birthSubscriptionResponse.body
    )}`
  )
  if (!birthSubscriptionResponse) {
    throw new Error('Cannot get response from subscription process')
  }

  logger.info('Subscribe Handler - Subscribed Successful Token')
  return h.response().code(202)
}
