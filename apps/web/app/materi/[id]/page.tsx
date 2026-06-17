"use client";

import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function MateriDetailPage() {
  const params = useParams();
  const id = params?.id;

  // Mock detail data
  const materi = {
    id: id,
    title: "Pengenalan Hangeul (Vokal Dasar)",
    content: `
# Hangeul Vokal Dasar

Bahasa Korea memiliki 10 huruf vokal dasar yang harus dipelajari pertama kali:
- ㅏ (a)
- ㅑ (ya)
- ㅓ (eo)
- ㅕ (yeo)
- ㅗ (o)
- ㅛ (yo)
- ㅜ (u)
- ㅠ (yu)
- ㅡ (eu)
- ㅣ (i)

Setiap vokal ini diucapkan dengan bentuk mulut yang berbeda. Pastikan Anda berlatih pengucapannya dengan tepat karena perbedaan kecil dapat mengubah makna kata.
    `,
    category: "Reading"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 space-section bg-gray-50/30">
        <div className="container px-4 md:px-6">
          <div className="mb-6">
            <Link href="/materi" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Kembali ke Daftar Materi
            </Link>
          </div>

          <div className="max-w-3xl mx-auto bg-white p-8 border border-gray-100 rounded-xl shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                {materi.category}
              </span>
              <h1 className="text-3xl font-bold font-heading mt-4 mb-2">
                {materi.title}
              </h1>
            </div>

            <div className="prose prose-blue max-w-none">
              {/* Simple markdown render simulation */}
              {materi.content.split('\\n').map((line, i) => {
                if (line.startsWith('# ')) return <h2 key={i} className="text-2xl font-bold mt-6 mb-4">{line.substring(2)}</h2>;
                if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc">{line.substring(2)}</li>;
                if (line.trim() === '') return <br key={i} />;
                return <p key={i} className="mb-4">{line}</p>;
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
