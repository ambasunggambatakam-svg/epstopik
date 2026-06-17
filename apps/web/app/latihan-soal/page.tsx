"use client";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import Link from "next/link";
import { BookOpen, Lock } from "lucide-react";

// Mock data based on PRD requirements
const latihanList = [
  { id: "1", title: "Latihan Reading Dasar", category: "Reading", isPremium: false, questionCount: 10 },
  { id: "2", title: "Latihan Listening Dasar", category: "Listening", isPremium: false, questionCount: 10 },
  { id: "3", title: "Latihan Kosakata Sehari-hari", category: "Vocabulary", isPremium: true, questionCount: 15 },
  { id: "4", title: "Latihan Tata Bahasa Menengah", category: "Grammar", isPremium: true, questionCount: 20 },
];

export default function LatihanSoalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 space-section bg-gray-50/30">
        <div className="container px-4 md:px-6">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Beranda</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Latihan Soal</span>
          </div>

          <div className="max-w-4xl mx-auto mt-8 space-y-6">
            <h1 className="text-3xl font-bold font-heading">
              Latihan Soal EPS-TOPIK
            </h1>
            <p className="text-muted-foreground mb-8">
              Pilih latihan soal berdasarkan kategori. Latihan reguler akan meningkatkan peluang Anda lulus EPS-TOPIK.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {latihanList.map((latihan) => (
                <Link
                  key={latihan.id}
                  href={latihan.isPremium ? `/materi/premium-lock` : `/latihan-soal/${latihan.id}`}
                  className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                        {latihan.category}
                      </span>
                      {latihan.isPremium && (
                        <div className="flex items-center text-xs font-medium text-amber-500 bg-amber-50 px-2 py-1 rounded-full">
                          <Lock className="w-3 h-3 mr-1" />
                          Premium
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{latihan.title}</h3>
                    <p className="text-sm text-gray-500">{latihan.questionCount} Soal</p>
                  </div>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {latihan.isPremium ? "Buka Akses Premium" : "Mulai Latihan"}
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
