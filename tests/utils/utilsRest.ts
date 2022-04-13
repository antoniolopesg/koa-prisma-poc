import request, { Response } from 'supertest'
import app from '@/app'

interface HttpRequestArgs {
  path: string
  body?: object
  authorization?: string
}

export async function postApiCall (args: HttpRequestArgs): Promise<Response> {
  const { path, body, authorization } = args

  const response = await request(app.callback()).post(`/api${path}`).set({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(authorization ? { authorization } : {})
  })
    .send(JSON.stringify(body))

  return response
}
