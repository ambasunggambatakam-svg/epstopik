import { FastifyPluginAsync } from 'fastify'
import cors from '@fastify/cors'
import dbPlugin from './plugins/db.js'
import jwtPlugin from './plugins/jwt.js'
import authRoutes from './routes/auth/index.js'
import quizRoutes from './routes/quiz/index.js'
import paymentRoutes from './routes/payment/index.js'
import adminRoutes from './routes/admin/index.js'
import userRoutes from './routes/user/index.js'

const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  // CORS
  await fastify.register(cors, {
    origin: '*' // update for production
  })

  // Plugins
  await fastify.register(dbPlugin)
  await fastify.register(jwtPlugin)

  // Routes
  await fastify.register(authRoutes, { prefix: '/api/auth' })
  await fastify.register(quizRoutes, { prefix: '/api/quizzes' })
  await fastify.register(paymentRoutes, { prefix: '/api/payments' })
  await fastify.register(adminRoutes, { prefix: '/api/admin' })
  await fastify.register(userRoutes, { prefix: '/api/user' })

  fastify.get('/', async function () {
    return { status: 'epstopik API is running' }
  })
}

export default app;
export { app }
