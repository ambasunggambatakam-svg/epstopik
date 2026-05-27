import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { verifyJwt } from '../../../../lib/server-jwt';

async function checkAdmin(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.split(' ')[1];
  if (!token) return false;
  const user = verifyJwt(token);
  if (!user || user.role !== 'ADMIN') return false;
  return true;
}

export async function GET(request: Request) {
  try {
    if (!(await checkAdmin(request))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const materi = await prisma.materi.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(materi);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await checkAdmin(request))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const materi = await prisma.materi.create({
      data: {
        title: body.title,
        content: body.content,
        category: body.category,
        fileUrl: body.fileUrl || null,
        isPremium: body.isPremium || false
      }
    });

    return NextResponse.json(materi);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
