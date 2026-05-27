import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";
import { prisma } from '@repo/database';

// Opt out of static caching for this page so it fetches the latest articles
export const dynamic = 'force-dynamic';

export default async function ArtikelPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pb-24">
        {/* Hero Section */}
        <div className="bg-primary/5 py-16 lg:py-24 border-b border-primary/10">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900">
                Artikel & Berita EPS-TOPIK
              </h1>
              <p className="text-lg text-gray-600">
                Dapatkan informasi terbaru seputar pendaftaran, tips belajar bahasa Korea, dan panduan lulus ujian EPS-TOPIK.
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container px-4 md:px-6 mt-12 lg:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <article key={blog.id} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full">
                  <div className="p-6 flex flex-col h-full">
                    {blog.imageUrl && (
                      <Link href={`/artikel/${blog.slug}`} className="block w-full h-48 overflow-hidden mb-4 rounded-xl">
                        <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </Link>
                    )}
                    
                    <div className="flex items-center gap-3 mb-4">
                      {blog.category && (
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {blog.category}
                        </span>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(blog.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold font-heading text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/artikel/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1">
                      {stripHtml(blog.content).substring(0, 150)}...
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4 text-gray-400" />
                        {blog.author || 'Admin EPSTOPIK'}
                      </div>
                      <Link 
                        href={`/artikel/${blog.slug}`}
                        className="flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform"
                      >
                        Baca <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">Belum ada artikel yang dipublikasikan saat ini.</p>
                <p className="text-gray-400 text-sm mt-2">Silakan kembali lagi nanti untuk mendapatkan informasi terbaru.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
