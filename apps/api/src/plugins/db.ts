import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DbPluginOptions {
  // Specify Support plugin options here
}

// Use TypeScript module augmentation to declare the type of
// the inner object property so you can use it in your routes
declare module 'fastify' {
  export interface FastifyInstance {
    prisma: PrismaClient
  }
}

export default fp<DbPluginOptions>(async (fastify) => {
  const prisma = new PrismaClient()
  await prisma.$connect()

  fastify.decorate('prisma', prisma)

  fastify.addHook('onClose', async (server) => {
    await server.prisma.$disconnect()
  })
})
