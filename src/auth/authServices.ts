import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { AppError } from '@/appError'
import { prisma } from '@/lib/prisma'
import { config } from '@/config'

export interface SignIn {
  token: string
}

export async function signinService (username: string, password: string): Promise<SignIn> {
  const user = await prisma.user.findFirst({ where: { username } })

  if (user == null) {
    throw new AppError(400, 'Invalid credentials')
  }

  const correctPassword = await compare(password, user.password)

  if (!correctPassword) {
    throw new AppError(400, 'Invalid credentials')
  }

  const token = sign({}, config.SECRET, { expiresIn: '1h', subject: user.id.toString() })

  return {
    token
  }
}
