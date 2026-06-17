"use client";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import Link from "next/link";
import { BookOpen, Lock } from "lucide-react";

// Mock data based on PRD requirements (List Materi, Kategori, Free/Premium lock)
const materiList = [
  { id: "1", title: "Pengenalan Hangeul (Vokal Dasar)", category: "Reading", isPremium: false },
  { id: "2", title: "Pengenalan Hangeul (Konsonan Dasar)", category: "Reading", isPremium: false },
  { id: "3", title: "Tata Bahasa Dasar: Partikel Subjek & Objek", category: "Grammar", isPremium: true },
  { id: "4", title: "Latihan Mendengarkan Angka Sino-Korea", category: "Listening", isPremium: true },
];

export default function MateriPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 space-section bg-gray-50/30">
        <div className="container px-4 md:px-6">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Beranda</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Materi Belajar</span>
          </div>

          <div className="max-w-4xl mx-auto mt-8 space-y-6">
            <h1 className="text-3xl font-bold font-heading">
              Materi Belajar EPS-TOPIK
            </h1>
            <p className="text-muted-foreground mb-8">
              Pelajari materi dasar hingga lanjutan untuk mempersiapkan ujian EPS-TOPIK Anda. 
              Beberapa materi memerlukan akses Premium.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materiList.map((materi) => (
                <Link
                  key={materi.id}
                  href={materi.isPremium ? `/materi/premium-lock` : `/materi/${materi.id}`}
                  className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                        {materi.category}
                      </span>
                      {materi.isPremium && (
                        <div className="flex items-center text-xs font-medium text-amber-500 bg-amber-50 px-2 py-1 rounded-full">
                          <Lock className="w-3 h-3 mr-1" />
                          Premium
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{materi.title}</h3>
                  </div>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {materi.isPremium ? "Buka Akses Premium" : "Mulai Belajar"}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
