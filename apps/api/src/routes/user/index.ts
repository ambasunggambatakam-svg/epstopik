import { FastifyPluginAsync } from 'fastify'

const userRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  
  // Middleware to ensure user is authenticated
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  // GET /api/user/dashboard
  fastify.get('/dashboard', async function (request, reply) {
    const userId = request.user.id

    const user = await fastify.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        xp: true,
        level: true,
        streak: true,
        subscriptionEnd: true
      }
    })

    if (!user) {
      reply.code(404)
      return { error: 'User not found' }
    }

    return user
  })

  // GET /api/user/history
  fastify.get('/history', async function (request) {
    const userId = request.user.id

    const history = await fastify.prisma.result.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        quiz: {
          select: { title: true, type: true }
        }
      }
    })

    return history
  })

  // GET /api/user/leaderboard
  fastify.get('/leaderboard', async function () {
    const leaderboard = await fastify.prisma.user.findMany({
      take: 10,
      orderBy: { xp: 'desc' },
      select: {
        id: true,
        name: true,
        xp: true,
        level: true
      }
    })

    return leaderboard
  })
}

export default userRoutes
