import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { verifyJwt } from '../../../../../lib/server-jwt';

async function checkAdmin(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.split(' ')[1];
  if (!token) return false;
  const user = verifyJwt(token);
  if (!user || user.role !== 'ADMIN') return false;
  return true;
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await checkAdmin(request))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await request.json();

    const kosakata = await prisma.kosakata.update({
      where: { id },
      data: {
        korean: body.korean,
        meaning: body.meaning,
        category: body.category,
        exampleSent: body.exampleSent
      }
    });

    return NextResponse.json(kosakata);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await checkAdmin(request))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;
    await prisma.kosakata.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
