import { Button } from "@repo/ui/button";
import { CheckCircle2, Clock, PlayCircle } from "lucide-react";
import Link from "next/link";

export function MiniTryoutSection() {
  return (
    <section id="mini-tryout" className="relative py-24 bg-gray-50 overflow-hidden">
      {/* Background shape: Split oval background on the right (Biru) */}
      <div className="absolute top-0 bottom-0 right-0 w-full md:w-1/2 bg-blue-600 md:rounded-l-[200px]" />
      
      <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT - Text */}
          <div className="space-y-8 pb-8 md:pb-0 relative z-20">
            <div className="space-y-4">
              <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">
                Coba Sekarang
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-gray-900 tracking-tight leading-tight">
                Mini Tryout EPS-TOPIK
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed font-medium">
                Coba simulasi mini seperti ujian asli untuk melihat sejauh mana
                kemampuan kamu saat ini.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, text: "10 soal pilihan ganda (format ujian asli)" },
                { icon: <Clock className="h-5 w-5 text-blue-600" />, text: "±5 menit saja" },
                { icon: <span className="text-lg">📊</span>, text: "Hasil langsung + level kemampuan" },
                { icon: <span className="text-lg">🚫</span>, text: "Tanpa login" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white px-5 py-3 rounded-full border border-gray-100 shadow-sm w-fit">
                  <span className="shrink-0">{item.icon}</span>
                  <span className="text-sm font-semibold text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>

            <Button
              size="xl"
              className="shadow-xl shadow-blue-600/30 text-lg px-8 py-6 rounded-full w-full sm:w-auto"
              asChild
            >
              <Link href="/tryout">
                <PlayCircle className="mr-2 h-6 w-6" /> Mulai Simulasi Sekarang
              </Link>
            </Button>
          </div>

          {/* RIGHT - Soal Preview Mockup */}
          <div className="relative z-20">
            <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl" />
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 space-y-8 transform hover:scale-105 transition-transform duration-500">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-4 py-2 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                  Mini EPS-TOPIK
                </span>
                <span className="text-sm text-gray-400 font-bold">
                  Soal 3 / 10
                </span>
              </div>

              {/* Progress */}
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-[30%]" />
              </div>

              {/* Question */}
              <div>
                <h4 className="font-bold text-lg mb-6 leading-relaxed text-gray-900">
                  빈칸에 알맞은 것을 고르십시오:
                  <br /><br />
                  저는 한국<span className="text-blue-600 underline underline-offset-4 decoration-2">___</span> 가고 싶습니다.
                </h4>

                <div className="space-y-3">
                  {["을", "에서", "에", "는"].map((opt, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border-2 font-medium transition-all flex items-center gap-4 ${
                        i === 2
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-100 bg-white"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center shrink-0 ${
                          i === 2
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {i === 2 ? <CheckCircle2 className="w-5 h-5"/> : String.fromCharCode(65 + i)}
                      </span>
                      <span className={`font-semibold ${i === 2 ? 'text-blue-900' : 'text-gray-700'}`}>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Label */}
              <div className="text-center pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-400">
                  simulasi 5 menit • format ujian asli
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
