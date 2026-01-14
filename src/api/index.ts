import type { ZodType } from 'zod'

import axios from 'axios'

import { message } from '~/utils'

const request = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 2_000,
  adapter: 'fetch',
})

function validate(data: unknown, schema: ZodType | undefined) {
  if (!schema) return
  const result = schema.safeParse(data)
  if (!result.success) {
    globalThis.console.error(result.error)
  }
}

request.interceptors.request.use((config) => {
  message.loading('Requesting...')
  validate(config.data, config.requestSchema)
  return config
})

request.interceptors.response.use(
  (value) => {
    message.success('Request Success')
    validate(value.data, value.config.responseSchema)
    return value
  },
  (error: Error) => {
    // const message = useMessage()
    message.error(error.message || 'Request Error')
    throw error
  },
)

export { request }

export type PageParams = Record<string, unknown>
