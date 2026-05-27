import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import bcrypt from 'bcrypt'

const authRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  
  fastify.post('/register', async function (request, reply) {
    const bodySchema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6)
    })

    const { name, email, password } = bodySchema.parse(request.body)

    // Check if user exists
    const existingUser = await fastify.prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      reply.code(400)
      return { error: 'Email is already registered' }
    }

    // Hash password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create user
    const user = await fastify.prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'FREE' // default role
      }
    })

    // Generate JWT
    const token = fastify.jwt.sign({ id: user.id, email: user.email || '', role: user.role })

    return { 
      success: true, 
      token, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email || '',
        role: user.role
      } 
    }
  })

  fastify.post('/login', async function (request, reply) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string()
    })

    const { email, password } = bodySchema.parse(request.body)

    const user = await fastify.prisma.user.findUnique({ where: { email } })
    if (!user || !user.passwordHash) {
      reply.code(401)
      return { error: 'Invalid credentials' }
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      reply.code(401)
      return { error: 'Invalid credentials' }
    }

    const token = fastify.jwt.sign({ id: user.id, email: user.email || '', role: user.role })

    return { 
      success: true, 
      token, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email || '',
        role: user.role
      } 
    }
  })
}

export default authRoutes
