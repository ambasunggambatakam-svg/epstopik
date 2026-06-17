"use client";

import { Button } from "@repo/ui/button";
import { CheckCircle2, PlayCircle, Eye } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient space-section">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div className="space-y-6 lg:max-w-xl animate-fade-in">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              Tryout CBT EPS-TOPIK
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-[1.15] text-[#1e293b]">
              Saatnya Coba Simulasi CBT <span className="text-primary">Pertama Kamu</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Coba simulasi mini seperti ujian asli untuk melihat sejauh mana kemampuan kamu saat ini.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="xl" className="shadow-lg shadow-primary/25 btn-ripple text-base" asChild>
                <Link href="/tryout">
                  <PlayCircle className="mr-2 h-5 w-5" /> Mulai Simulasi Gratis
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="text-base" asChild>
                <Link href="#mini-tryout">
                  <Eye className="mr-2 h-5 w-5" /> Lihat Contoh Soal
                </Link>
              </Button>
            </div>
            
            <p className="text-sm font-medium text-gray-500 flex items-center gap-4 pt-2">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500"/> Gratis</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500"/> 100+ Latihan</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500"/> Tanpa Login</span>
            </p>
          </div>

          {/* RIGHT CONTENT (Mockup Cards) */}
          <div className="relative animate-slide-in-right delay-300 mx-auto w-full max-w-md lg:max-w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/5 rounded-full blur-3xl scale-110" />
            
            <div className="relative space-y-6">
              {/* Question Card Mockup */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 transform transition-transform hover:-translate-y-1">
                <div className="flex justify-between items-center mb-6">
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold">
                    Mini Tryout EPS-TOPIK
                  </span>
                  <span className="text-sm font-bold text-gray-500">
                    3 / 10
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
                  <div className="bg-blue-600 h-2 rounded-full w-[30%]"></div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-gray-900 leading-snug">
                    빈칸에 알맞은 것을 고르십시오:<br/><br/>
                    저는 한국<span className="text-blue-600 underline underline-offset-4 decoration-2">___</span> 가고 싶습니다.
                  </h3>

                  <div className="space-y-3">
                    {["을", "에서", "에", "는"].map((opt, i) => (
                      <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${i === 2 ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i === 2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                          {i === 2 ? <CheckCircle2 className="w-5 h-5"/> : String.fromCharCode(65 + i)}
                        </div>
                        <span className={`font-semibold ${i === 2 ? 'text-blue-900' : 'text-gray-700'}`}>{opt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 text-center border-t pt-4">
                  <span className="text-sm text-gray-400 font-medium">Simulasi 5 menit • Format Ujian Asli</span>
                </div>
              </div>

              {/* Result Preview Overlay Card */}
              <div className="absolute -bottom-10 -left-10 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-72 animate-float hidden md:block">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-600">Peringkat Simulasi</span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-extrabold text-blue-600">78</span>
                  <span className="text-gray-400 font-medium">/ 100</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                    Belum Siap Ujian
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
