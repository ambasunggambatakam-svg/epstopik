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
    const { title, slug, content, category, author, metaTitle, metaDescription, imageUrl } = body;

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        category,
        author,
        metaTitle,
        metaDescription,
        imageUrl
      }
    });

    return NextResponse.json(blog);
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
    await prisma.blog.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
