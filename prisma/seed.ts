import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main (): Promise<void> {
  try {
    await prisma.user.create({
      data: {
        username: 'antoniolopesg',
        password: await hash('3066fd4f448879ad65bcaf14bdc11fa7', 10)
      }
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

void main()
