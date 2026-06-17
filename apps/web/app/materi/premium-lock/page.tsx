"use client";

import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import Link from "next/link";
import { Lock, Crown, ChevronLeft } from "lucide-react";

export default function PremiumLockPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-50/50">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          
          <h1 className="text-2xl font-bold font-heading text-gray-900 mb-2">
            Akses Terkunci
          </h1>
          <p className="text-gray-600 mb-8">
            Materi ini hanya tersedia untuk pengguna Premium. Upgrade akun Anda sekarang untuk membuka semua materi pembelajaran, tryout, dan fitur eksklusif lainnya.
          </p>

          <div className="space-y-4">
            <Link 
              href="/#pricing" 
              className="flex items-center justify-center w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-colors"
            >
              <Crown className="w-5 h-5 mr-2" />
              Upgrade ke Premium
            </Link>
            
            <Link 
              href="/materi" 
              className="flex items-center justify-center w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Kembali ke Daftar Materi
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
