import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@epstopik.id' },
    update: {
      passwordHash,
      role: 'ADMIN'
    },
    create: {
      email: 'admin@epstopik.id',
      name: 'Administrator',
      passwordHash,
      role: 'ADMIN'
    }
  });
  console.log('Admin created:', user.email);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
