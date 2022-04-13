import { postApiCall } from '@/tests/utils/utilsRest'
import { clearDatabase, createUser } from '@/tests/utils/utilsDb'

describe('SignIn Route', () => {
  beforeEach(clearDatabase)

  it('Should be able to signin if a valid username and password is provided', async () => {
    const { username, password } = await createUser()

    const response = await postApiCall({
      path: '/signin',
      body: {
        username,
        password
      }
    })

    expect(response.body.token).toBeDefined()
    expect(response.body.token).toBeTruthy()
    expect(response.statusCode).toBe(200)
  })

  it('Should return 400 if username is not provided', async () => {
    const response = await postApiCall({
      path: '/signin',
      body: {
        password: 'some password'
      }
    })

    expect(response.body.message).toBe('"username" is required')
    expect(response.statusCode).toBe(400)
  })

  it('Should return 400 if password is not provided', async () => {
    const response = await postApiCall({
      path: '/signin',
      body: {
        username: 'some username'
      }
    })

    expect(response.body.message).toBe('"password" is required')
    expect(response.statusCode).toBe(400)
  })
})
