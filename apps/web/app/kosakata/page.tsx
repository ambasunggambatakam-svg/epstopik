"use client";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import Link from "next/link";
import { Search, Volume2 } from "lucide-react";

// Mock data based on PRD requirements
const kosakataList = [
  { id: "1", korean: "안녕하세요", meaning: "Halo / Selamat pagi / siang / malam", category: "Salam", exampleSent: "안녕하세요? 저는 Budi입니다." },
  { id: "2", korean: "감사합니다", meaning: "Terima kasih", category: "Salam", exampleSent: "도와주셔서 감사합니다." },
  { id: "3", korean: "회사", meaning: "Perusahaan", category: "Pekerjaan", exampleSent: "저는 회사에 다닙니다." },
  { id: "4", korean: "일하다", meaning: "Bekerja", category: "Pekerjaan", exampleSent: "매일 8시간 일합니다." },
];

export default function KosakataPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 space-section bg-gray-50/30">
        <div className="container px-4 md:px-6">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Beranda</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Kosakata Korea</span>
          </div>

          <div className="max-w-4xl mx-auto mt-8 space-y-6">
            <h1 className="text-3xl font-bold font-heading">
              Kamus Kosakata EPS-TOPIK
            </h1>
            <p className="text-muted-foreground mb-8">
              Kumpulan kosakata bahasa Korea yang sering muncul dalam ujian EPS-TOPIK, lengkap dengan arti dan contoh kalimat.
            </p>

            {/* Search Bar Placeholder */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari kosakata Korea atau artinya..." 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>

            <div className="space-y-4">
              {kosakataList.map((item) => (
                <div key={item.id} className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-green-50 text-green-600 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{item.korean}</h3>
                    <button className="text-gray-400 hover:text-primary transition-colors" title="Dengarkan Pengucapan">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-lg text-gray-700 font-medium mb-4">{item.meaning}</p>
                  
                  <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
                    <span className="font-semibold block mb-1">Contoh kalimat:</span>
                    {item.exampleSent}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
