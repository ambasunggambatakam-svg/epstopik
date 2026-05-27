import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const passwordHash = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@epstopik.id' },
    update: {},
    create: {
      email: 'admin@epstopik.id',
      name: 'Admin Utama',
      passwordHash,
      role: 'ADMIN',
    },
  })

  console.log('Admin user created:', admin.email)

  // Create some initial questions
  const q1 = await prisma.question.create({
    data: {
      type: 'READING',
      content: '다음 중 "사과"의 뜻은 무엇입니까?',
      options: ['Apel', 'Jeruk', 'Semangka', 'Pisang'],
      correctAnswer: 0,
      explanation: '사과 (sagwa) berarti Apel dalam bahasa Korea.'
    }
  })

  const q2 = await prisma.question.create({
    data: {
      type: 'LISTENING',
      content: 'Audio: 남자가 무엇을 하고 있습니까? (Asumsikan ada audio)',
      options: ['Makan nasi', 'Minum air', 'Membaca buku', 'Tidur'],
      correctAnswer: 2,
      explanation: 'Pria tersebut sedang memegang buku dan membacanya.'
    }
  })

  console.log('Created questions:', q1.id, q2.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
