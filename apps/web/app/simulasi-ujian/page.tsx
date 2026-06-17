"use client";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import Link from "next/link";
import { Clock, Lock, FileText } from "lucide-react";

const tryoutPackages = [
  { id: "1", title: "Tryout Mini Gratis", duration: 5, questionCount: 10, isPremium: false },
  { id: "2", title: "Simulasi Ujian Penuh 1", duration: 50, questionCount: 40, isPremium: true },
  { id: "3", title: "Simulasi Ujian Penuh 2", duration: 50, questionCount: 40, isPremium: true },
  { id: "4", title: "Simulasi Ujian Penuh 3 (Sulit)", duration: 50, questionCount: 40, isPremium: true },
];

export default function SimulasiUjianPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 space-section bg-gray-50/30">
        <div className="container px-4 md:px-6">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Beranda</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Simulasi Ujian</span>
          </div>

          <div className="max-w-4xl mx-auto mt-8 space-y-6">
            <h1 className="text-3xl font-bold font-heading">
              Simulasi Ujian EPS-TOPIK
            </h1>
            <p className="text-muted-foreground mb-8">
              Latih kesiapan Anda dengan simulasi yang menyerupai ujian aslinya. Simulasi penuh dibatasi waktu 50 menit untuk 40 soal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tryoutPackages.map((pkg) => (
                <Link
                  key={pkg.id}
                  href={pkg.isPremium ? `/materi/premium-lock` : `/simulasi-ujian/${pkg.id}`}
                  className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-semibold px-2 py-1 bg-purple-50 text-purple-600 rounded-full flex items-center">
                        <FileText className="w-3 h-3 mr-1" /> Tryout
                      </span>
                      {pkg.isPremium && (
                        <div className="flex items-center text-xs font-medium text-amber-500 bg-amber-50 px-2 py-1 rounded-full">
                          <Lock className="w-3 h-3 mr-1" />
                          Premium
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{pkg.title}</h3>
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {pkg.duration} Menit</span>
                      <span>{pkg.questionCount} Soal</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium border-t border-gray-100 pt-4">
                    {pkg.isPremium ? "Buka Akses Premium" : "Mulai Simulasi"}
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
