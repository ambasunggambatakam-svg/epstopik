"use client";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { PricingCard } from "../../components/PricingCard";
import { QuizEngine } from "../../components/QuizEngine";
import type { Question } from "../../components/QuizEngine";
import questionsData from "../../data/questions/mini-tryout.json";

export default function TryoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 space-section bg-gray-50/30">
        <div className="container px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-muted-foreground">
            <span>Beranda</span>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Mini Tryout</span>
          </div>

          {/* Quiz Engine */}
          <QuizEngine
            questions={questionsData as Question[]}
            title="Mini Tryout EPS-TOPIK"
            showTimer={true}
            timerMinutes={5}
          />

          {/* SEO Content */}
          <div className="max-w-2xl mx-auto mt-16 space-y-6">
            <h2 className="text-xl font-bold font-heading">
              Latihan Mini EPS-TOPIK Online Gratis
            </h2>
            <div className="prose prose-sm prose-gray max-w-none text-muted-foreground space-y-4">
              <p>
                Mini Tryout EPS-TOPIK ini dirancang untuk membantu kamu mengukur
                kesiapan sebelum menghadapi ujian resmi. Dengan 10 soal pilihan
                ganda yang mengikuti pola ujian asli, kamu bisa mengetahui
                level kemampuanmu dalam waktu 5 menit.
              </p>
              <p>
                Soal mencakup kategori vocabulary, grammar, reading, dan
                listening yang sering muncul di ujian EPS-TOPIK. Setelah
                menyelesaikan tryout, kamu akan mendapat analisis detail
                termasuk skor, level, prediksi peluang lulus, dan rekomendasi
                area yang perlu ditingkatkan.
              </p>
              <p>
                Latihan ini bisa diakses kapan saja tanpa login dan sepenuhnya
                gratis. Cocok untuk kamu yang baru mulai belajar bahasa Korea
                atau sudah dalam tahap persiapan ujian EPS-TOPIK untuk program
                kerja ke Korea Selatan.
              </p>
            </div>
          </div>
          {/* Pricing Section */}
          <div id="pricing" className="max-w-4xl mx-auto mt-20 pb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold font-heading mb-4">Pilih Paket Belajar</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Tingkatkan peluang lulus ujian EPS-TOPIK dengan fitur premium. Bebas pilih paket sesuai kebutuhanmu.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <PricingCard plan="free" />
              <PricingCard plan="premium" highlighted={true} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
