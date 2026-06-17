import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JwtPluginOptions {
  // Specify Support plugin options here
}

export default fp<JwtPluginOptions>(async (fastify) => {
  // Register fastify-jwt
  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'supersecret_development_key_12345'
  })

  // Add a decorator to quickly protect routes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fastify.decorate('authenticate', async function (request: any, reply: any) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
})

// Extend fastify types
declare module 'fastify' {
  export interface FastifyInstance {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authenticate: any
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: string, email: string, role: string }
    user: { id: string, email: string, role: string }
  }
}
