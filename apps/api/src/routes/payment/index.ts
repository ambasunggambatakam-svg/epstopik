import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import crypto from 'crypto'

const paymentRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  
  // Helper to generate Invoice ID
  const generateInvoiceId = () => `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`

  // POST /api/payments/checkout
  fastify.post('/checkout', async function (request, reply) {
    const bodySchema = z.object({
      email: z.string().email(),
      planId: z.string(), // e.g., 'premium'
    })

    const body = bodySchema.parse(request.body)
    
    // Hardcoded amount for MVP based on plan
    const amount = body.planId === 'premium' ? 25000 : 0

    if (amount === 0) {
      return { success: false, message: 'Free plan does not require payment' }
    }

    // 1. Find or create user by email
    let user = await fastify.prisma.user.findUnique({ where: { email: body.email } })
    if (!user) {
      user = await fastify.prisma.user.create({
        data: { email: body.email, name: body.email.split('@')[0], role: 'FREE' }
      })
    }

    const invoiceId = generateInvoiceId()

    // 2. Create Transaction record as PENDING
    const transaction = await fastify.prisma.transaction.create({
      data: {
        id: invoiceId,
        userId: user.id,
        amount,
        status: 'PENDING'
      }
    })

    // 3. Call Doku Checkout API (Mock implementation for now)
    // Real implementation would make an HTTP POST to Doku API with Signature etc.
    const mockPaymentUrl = `https://jokul.doku.com/checkout/link/${invoiceId}`
    
    // Update transaction with URL
    await fastify.prisma.transaction.update({
      where: { id: transaction.id },
      data: { paymentUrl: mockPaymentUrl }
    })

    return { 
      success: true, 
      invoiceId: transaction.id, 
      paymentUrl: mockPaymentUrl 
    }
  })

  // POST /api/payments/webhook
  // This endpoint will be hit by Doku when a payment succeeds or fails
  fastify.post('/webhook', async function (request, reply) {
    // Doku webhook payload usually contains order info and signature
    const bodySchema = z.object({
      order: z.object({
        invoice_number: z.string(),
        amount: z.number()
      }),
      transaction: z.object({
        status: z.string() // e.g., 'SUCCESS', 'FAILED'
      }).optional()
    }).passthrough()

    const body = bodySchema.parse(request.body)
    const invoiceId = body.order.invoice_number

    const transaction = await fastify.prisma.transaction.findUnique({
      where: { id: invoiceId }
    })

    if (!transaction) {
      reply.code(404)
      return { error: 'Transaction not found' }
    }

    const status = body.transaction?.status === 'SUCCESS' ? 'PAID' : 'FAILED'

    // Update transaction status
    await fastify.prisma.transaction.update({
      where: { id: invoiceId },
      data: { status }
    })

    // If PAID, upgrade user to PREMIUM
    if (status === 'PAID') {
      const oneMonthFromNow = new Date()
      oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1)

      await fastify.prisma.user.update({
        where: { id: transaction.userId },
        data: { 
          role: 'PREMIUM',
          subscriptionEnd: oneMonthFromNow
        }
      })
    }

    return { success: true }
  })
}

export default paymentRoutes
