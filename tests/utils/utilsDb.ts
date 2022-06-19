import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import crypto from 'node:crypto'

interface CreateUserArgs {
  fake?: boolean
  username?: string
  password?: string
}

const DEFAULT_ARGS = {
  fake: true
}

type UserCredentials = Pick<User, 'username' | 'password'>

export async function createUser ({ fake, username, password }: CreateUserArgs = DEFAULT_ARGS): Promise<UserCredentials> {
  const data = !fake && username && password
    ? { username, password }
    : getRandomizedUserCredentials()

  const hashedPassword = await hash(data.password, 10)

  const user = await prisma.user.create({
    data: { ...data, password: hashedPassword }
  })

  return {
    ...user,
    ...(password ? { password } : { password: data.password })
  }
}

function getRandomizedUserCredentials (): UserCredentials {
  return {
    username: faker.name.findName(),
    password: crypto.randomUUID()
  }
}

export async function clearDatabase (): Promise<void> {
  await prisma.$transaction(
    [
      prisma.user.deleteMany()
    ]
  )
}
