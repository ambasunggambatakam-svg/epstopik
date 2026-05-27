import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const blog = await prisma.blog.findUnique({
        where: { slug }
      });
      
      if (!blog) {
        return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
      }
      return NextResponse.json(blog);
    }

    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
