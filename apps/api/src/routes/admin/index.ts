import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'

const adminRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  
  // Middleware to ensure user is authenticated and has ADMIN role
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
      if (request.user.role !== 'ADMIN') {
        reply.code(403).send({ error: 'Forbidden: Admins only' })
      }
    } catch (err) {
      reply.send(err)
    }
  })

  // GET /api/admin/users
  fastify.get('/users', async function () {
    const users = await fastify.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    })
    return users
  })

  // PUT /api/admin/users/:id
  fastify.put('/users/:id', async function (request) {
    const { id } = request.params as { id: string }
    const bodySchema = z.object({
      role: z.enum(['GUEST', 'FREE', 'PREMIUM', 'ADMIN'])
    })
    const { role } = bodySchema.parse(request.body)
    
    const user = await fastify.prisma.user.update({
      where: { id },
      data: { role }
    })
    return user
  })

  // DELETE /api/admin/users/:id
  fastify.delete('/users/:id', async function (request) {
    const { id } = request.params as { id: string }
    await fastify.prisma.user.delete({ where: { id } })
    return { success: true }
  })

  // GET /api/admin/questions
  fastify.get('/questions', async function () {
    const questions = await fastify.prisma.question.findMany({
      orderBy: { id: 'desc' }
    })
    return questions
  })

  // POST /api/admin/questions
  fastify.post('/questions', async function (request) {
    const bodySchema = z.object({
      type: z.enum(['READING', 'LISTENING']),
      content: z.string(),
      options: z.array(z.string()),
      correctAnswer: z.number(),
      explanation: z.string().optional()
    })

    const body = bodySchema.parse(request.body)

    const question = await fastify.prisma.question.create({
      data: body
    })
    return question
  })

  // PUT /api/admin/questions/:id
  fastify.put('/questions/:id', async function (request) {
    const { id } = request.params as { id: string }
    const bodySchema = z.object({
      type: z.enum(['READING', 'LISTENING']).optional(),
      content: z.string().optional(),
      options: z.array(z.string()).optional(),
      correctAnswer: z.number().optional(),
      explanation: z.string().optional()
    })

    const body = bodySchema.parse(request.body)
    const question = await fastify.prisma.question.update({
      where: { id },
      data: body
    })
    return question
  })

  // DELETE /api/admin/questions/:id
  fastify.delete('/questions/:id', async function (request) {
    const { id } = request.params as { id: string }
    await fastify.prisma.question.delete({ where: { id } })
    return { success: true }
  })

  // POST /api/admin/materi
  fastify.post('/materi', async function (request) {
    const bodySchema = z.object({
      title: z.string(),
      content: z.string(),
      category: z.string(),
      isPremium: z.boolean().default(false)
    })

    const body = bodySchema.parse(request.body)
    const materi = await fastify.prisma.materi.create({ data: body })
    return materi
  })

  // POST /api/admin/kosakata
  fastify.post('/kosakata', async function (request) {
    const bodySchema = z.object({
      korean: z.string(),
      meaning: z.string(),
      category: z.string(),
      exampleSent: z.string().optional()
    })

    const body = bodySchema.parse(request.body)
    const kosakata = await fastify.prisma.kosakata.create({ data: body })
    return kosakata
  })

  // POST /api/admin/blog
  fastify.post('/blog', async function (request) {
    const bodySchema = z.object({
      title: z.string(),
      slug: z.string(),
      content: z.string(),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      category: z.string().optional(),
      author: z.string().optional()
    })

    const body = bodySchema.parse(request.body)
    const blog = await fastify.prisma.blog.create({ data: body })
    return blog
  })
}

export default adminRoutes
