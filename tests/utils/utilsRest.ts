import request, { Response } from 'supertest'
import app from '@/app'

interface HttpRequestArgs {
  path: string
  body?: object
  token?: string
}

export async function postApiCall (args: HttpRequestArgs): Promise<Response> {
  const { path, body, token } = args

  const response = await request(app.callback()).post(`/api${path}`).set({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  })
    .send(JSON.stringify(body))

  return response
}
