import Fastify from 'fastify'
import appPlugin from './app.js'

const fastify = Fastify({
  logger: true
})

// Register the main app plugin
fastify.register(appPlugin)

fastify.listen({ port: 3001, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`)
})
