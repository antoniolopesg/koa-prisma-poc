import { postApiCall } from '@/tests/utils/utilsRest'
import { clearDatabase, createUser } from '@/tests/utils/utilsDb'
import { accountMessages, ONLY_AUTHENTICATED_USERS_CAN_ACESS_ERROR } from '@/errorMessages'

describe('SignIn Route', () => {
  beforeEach(clearDatabase)

  it('Should return 201 if a valid name is provided', async () => {
    const { username, password } = await createUser()

    const signinResponse = await postApiCall({
      path: '/signin',
      body: {
        username,
        password
      }
    })

    const response = await postApiCall({
      path: '/accounts',
      body: {
        name: 'valid name'
      },
      token: signinResponse.body.token
    })

    expect(response.statusCode).toBe(201)
  })

  it('Should return 400 if provide a account name already in use', async () => {
    const { username, password } = await createUser()

    const signinResponse = await postApiCall({
      path: '/signin',
      body: {
        username,
        password
      }
    })

    await postApiCall({
      path: '/accounts',
      body: {
        name: 'valid name'
      },
      token: signinResponse.body.token
    })

    const response = await postApiCall({
      path: '/accounts',
      body: {
        name: 'valid name'
      },
      token: signinResponse.body.token
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      message: accountMessages.ACCOUNT_NAME_ALREADY_IN_USE
    })
  })

  it('Should return 400 if name is not provided', async () => {
    const { username, password } = await createUser()

    const signinResponse = await postApiCall({
      path: '/signin',
      body: {
        username,
        password
      }
    })

    const response = await postApiCall({
      path: '/accounts',
      token: signinResponse.body.token
    })

    expect(response.body).toEqual({
      message: '"name" is required'
    })
    expect(response.statusCode).toBe(400)
  })

  it('Should return 401 if try to create account without authentication', async () => {
    const response = await postApiCall({
      path: '/accounts'
    })

    expect(response.body).toEqual({
      message: ONLY_AUTHENTICATED_USERS_CAN_ACESS_ERROR
    })
    expect(response.statusCode).toBe(401)
  })
})
