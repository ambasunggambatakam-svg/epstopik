import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { prisma } from '@repo/database';
import { Metadata } from 'next';

// Dynamic route setup
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug: resolvedParams.slug }
  });

  if (!blog) {
    return {
      title: 'Artikel Tidak Ditemukan - EPSTOPIK.ID'
    };
  }

  return {
    title: `${blog.metaTitle || blog.title} - EPSTOPIK.ID`,
    description: blog.metaDescription || blog.content.substring(0, 160),
  };
}

export default async function SingleArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug: resolvedParams.slug }
  });

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/artikel" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Artikel
          </Link>
          
          <article className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-10 border-b border-gray-100">
              {blog.category && (
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                    <Tag className="w-4 h-4" />
                    {blog.category}
                  </span>
                </div>
              )}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-gray-900 leading-tight mb-6">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="font-medium text-gray-900">{blog.author || 'Admin EPSTOPIK'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blog.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
            
            {blog.imageUrl && (
              <div className="w-full">
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-auto object-cover max-h-[500px]" />
              </div>
            )}
            
            <div className="p-6 md:p-10 prose prose-lg prose-blue max-w-none">
              {/* Note: In a production app, use react-markdown or similar to render markdown content */}
              <div 
                className="whitespace-pre-wrap font-serif leading-relaxed text-gray-800"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
