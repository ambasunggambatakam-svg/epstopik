"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

export function ResultPreviewSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">
            Contoh Hasil
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-gray-900 tracking-tight">
            Hasil yang Akan Kamu Dapatkan
          </h2>
          <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">
            Setelah mini tryout, kamu akan langsung melihat posisi kemampuan kamu secara jelas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Column 1: Score & Progress */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-8">
            <h3 className="text-gray-500 font-bold uppercase tracking-widest text-sm">
              📊 Skor Simulasi
            </h3>
            
            <div className="relative inline-flex items-center justify-center">
              {/* Circular progress background */}
              <svg className="w-48 h-48 transform -rotate-90">
                <circle className="text-gray-100" strokeWidth="12" stroke="currentColor" fill="transparent" r="88" cx="96" cy="96" />
                <circle className="text-blue-600" strokeWidth="12" strokeDasharray="552.92" strokeDashoffset="221.16" strokeLinecap="round" stroke="currentColor" fill="transparent" r="88" cx="96" cy="96" />
              </svg>
              {/* Text inside circle */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-6xl font-extrabold font-heading text-blue-600">6</span>
                <span className="text-xl font-bold text-gray-400 border-t-2 border-gray-100 pt-1 mt-1 w-16">10</span>
              </div>
            </div>

            <div className="bg-amber-50 text-amber-600 px-6 py-2 rounded-full font-bold text-sm border border-amber-200">
              Menengah (Intermediate)
            </div>
          </div>

          {/* Column 2: Analysis & Prediction */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="flex items-center gap-3 font-semibold text-gray-800">
                  <CheckCircle2 className="h-6 w-6 text-green-500" /> Vocabulary
                </span>
                <span className="font-bold text-gray-900 bg-white px-4 py-1.5 rounded-full shadow-sm">Lumayan</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="flex items-center gap-3 font-semibold text-gray-800">
                  <XCircle className="h-6 w-6 text-red-500" /> Grammar
                </span>
                <span className="font-bold text-gray-900 bg-white px-4 py-1.5 rounded-full shadow-sm">Lemah</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="flex items-center gap-3 font-semibold text-gray-800">
                  <XCircle className="h-6 w-6 text-red-500" /> Listening
                </span>
                <span className="font-bold text-gray-900 bg-white px-4 py-1.5 rounded-full shadow-sm">Perlu latihan</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-800 font-semibold text-center leading-relaxed">
                Kamu sudah punya dasar, tapi belum cukup untuk lulus EPS-TOPIK.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 text-center space-y-5">
              <h4 className="font-bold text-gray-900 text-lg">
                🔥 Mau tahu peluang kamu lulus?
              </h4>
              <Link 
                href="https://wa.me/xxxxxxxxxx" 
                target="_blank"
                className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-500/30 transition-all hover:-translate-y-1 w-full"
              >
                <span className="text-xl">👉</span> Gabung WhatsApp Channel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
