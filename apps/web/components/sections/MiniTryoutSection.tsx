import { Button } from "@repo/ui/button";
import { CheckCircle2, Clock, PlayCircle } from "lucide-react";
import Link from "next/link";

export function MiniTryoutSection() {
  return (
    <section id="mini-tryout" className="space-section bg-gray-50/50">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left - Text */}
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-bold uppercase tracking-wider text-primary">
                  Coba Sekarang
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tight">
                  Mini Tryout EPS-TOPIK
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Coba mini tryout seperti ujian asli untuk melihat sejauh mana
                  kemampuan kamu saat ini.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: <CheckCircle2 className="h-4 w-4 text-success" />, text: "10 soal pilihan ganda (format ujian asli)" },
                  { icon: <Clock className="h-4 w-4 text-primary" />, text: "±5 menit saja" },
                  { icon: "📊", text: "Hasil langsung + level kemampuan" },
                  { icon: "🚫", text: "Tanpa login" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="shrink-0">{typeof item.icon === "string" ? item.icon : item.icon}</span>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <Button
                size="xl"
                className="shadow-lg shadow-primary/25 btn-ripple w-full sm:w-auto"
                asChild
              >
                <Link href="/tryout">
                  <PlayCircle className="mr-2 h-5 w-5" /> Mulai Simulasi Sekarang
                </Link>
              </Button>
            </div>

            {/* Right - Soal Preview Mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-xl" />
              <div className="relative bg-white rounded-2xl border shadow-xl p-6 space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full">
                    Mini EPS-TOPIK
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    Soal 3 / 10
                  </span>
                </div>

                {/* Progress */}
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[30%]" />
                </div>

                {/* Question */}
                <div>
                  <h4 className="font-bold text-sm mb-4">
                    빈칸에 알맞은 것을 고르십시오:
                    <br />
                    저는 한국___ 가고 싶습니다.
                  </h4>

                  <div className="space-y-2">
                    {["을", "에서", "에", "는"].map((opt, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                          i === 2
                            ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                            : "border-gray-200"
                        }`}
                      >
                        <span className="inline-flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                              i === 2
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-muted-foreground"
                            }`}
                          >
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Label */}
                <div className="text-center">
                  <span className="text-xs text-muted-foreground">
                    simulasi 5 menit • format ujian asli
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
