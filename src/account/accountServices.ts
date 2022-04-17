import { AppError } from '@/appError'
import { ACCOUNT_NAME_ALREADY_IN_USE } from './accountErrorMessages'
import { prisma } from '@/lib/prisma'
import type { User } from '@prisma/client'

export async function createAccountService (name: string, loggedUser: User): Promise<void> {
  const accountFound = await prisma.account.findFirst({
    where: {
      owner: loggedUser,
      AND: {
        name
      }
    }
  })

  if (accountFound) {
    throw new AppError(400, ACCOUNT_NAME_ALREADY_IN_USE)
  }

  await prisma.account.create({
    data: {
      name,
      ownerId: loggedUser.id
    }
  })
}
