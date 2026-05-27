import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'

const quizRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  
  // GET /api/quizzes -> List all tryouts
  fastify.get('/', async function (request, reply) {
    const quizzes = await fastify.prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        _count: {
          select: { questions: true }
        }
      }
    })
    return quizzes
  })

  // GET /api/quizzes/:id -> Get specific tryout with questions
  fastify.get('/:id', async function (request, reply) {
    const paramsSchema = z.object({ id: z.string() })
    const { id } = paramsSchema.parse(request.params)

    const quiz = await fastify.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: true
      }
    })

    if (!quiz) {
      reply.code(404)
      return { error: 'Quiz not found' }
    }

    // Hide answers from clients to prevent cheating, unless they are admin (simplified for MVP)
    const secureQuestions = quiz.questions.map(q => {
      const { correctAnswer, explanation, ...safeQuestion } = q
      return safeQuestion
    })

    return { ...quiz, questions: secureQuestions }
  })

  // POST /api/results -> Save tryout score
  fastify.post('/results', async function (request, reply) {
    const bodySchema = z.object({
      quizId: z.string(),
      score: z.number(),
      total: z.number(),
      userId: z.string().optional(), // Optional for now since login isn't required yet
      analysis: z.record(z.any()).optional()
    })

    const body = bodySchema.parse(request.body)

    // For MVP, if no userId is provided, we might just return success without saving 
    // or we can save it with an anonymous user ID later. 
    // Let's create an anonymous result if user is not logged in.
    let targetUserId = body.userId

    if (!targetUserId) {
      // Find or create an anonymous user placeholder or skip saving
      // For now, let's just create a generic 'guest' user if not provided
      let guestUser = await fastify.prisma.user.findFirst({ where: { role: 'GUEST' } })
      if (!guestUser) {
        guestUser = await fastify.prisma.user.create({
          data: { name: 'Guest User', role: 'GUEST' }
        })
      }
      targetUserId = guestUser.id
    }

    const result = await fastify.prisma.result.create({
      data: {
        quizId: body.quizId,
        score: body.score,
        total: body.total,
        userId: targetUserId,
        analysis: body.analysis || {}
      }
    })

    return { success: true, resultId: result.id }
  })
}

export default quizRoutes
