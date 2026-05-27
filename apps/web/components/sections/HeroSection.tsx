"use client";

import { Button } from "@repo/ui/button";
import { AnimatedCounter } from "../AnimatedCounter";
import { ProgressBar } from "../ProgressBar";
import { Badge } from "../Badge";
import { PlayCircle, Eye, Clock, Target, BarChart3, ChevronDown } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient space-section">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-destructive/5 rounded-full blur-3xl -ml-32 -mb-32" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* LEFT - Message + CTA */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold font-heading tracking-tight leading-[1.15]">
              Cek Peluang Kamu
              <br />
              Lulus{" "}
              <span className="text-primary">EPS-TOPIK</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Kerjakan simulasi singkat seperti ujian asli. Dalam 5 menit, kamu
              bisa tahu kemampuanmu saat ini.
            </p>

            {/* Warning hook */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-amber-600 text-lg">⚠️</span>
              <p className="text-sm text-amber-800 leading-relaxed">
                Banyak peserta merasa sudah siap, tapi hasilnya belum sesuai
                saat ujian sebenarnya.
              </p>
            </div>

            {/* Micro info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" /> 5 menit saja
              </span>
              <span className="flex items-center gap-1.5">
                <Target className="h-4 w-4 text-primary" /> 10 soal simulasi
              </span>
              <span className="flex items-center gap-1.5">
                <BarChart3 className="h-4 w-4 text-primary" /> Hasil langsung
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="xl"
                className="shadow-lg shadow-primary/25 btn-ripple"
                asChild
              >
                <Link href="/tryout">
                  <PlayCircle className="mr-2 h-5 w-5" /> Mulai Simulasi Gratis
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="#mini-tryout">
                  <Eye className="mr-2 h-5 w-5" /> Lihat Contoh Soal
                </Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Tanpa login • Gratis • Hasil langsung + level kemampuan
            </p>
          </div>

          {/* RIGHT - Live Result Preview (Mockup) */}
          <div className="animate-slide-in-right delay-300">
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-destructive/10 rounded-3xl blur-2xl scale-95" />

              {/* Result Preview Card */}
              <div className="relative bg-white rounded-2xl border shadow-2xl p-8 space-y-6 animate-float">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    📊 Preview Hasil
                  </span>
                  <Badge level="intermediate" size="sm" animated />
                </div>

                <div className="text-center space-y-2">
                  <div className="text-5xl font-extrabold font-heading text-primary">
                    <AnimatedCounter target={68} suffix="" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Skor Simulasi
                  </p>
                </div>

                <ProgressBar
                  value={68}
                  size="md"
                  color="warning"
                  label="Kesiapan Ujian"
                  showLabel
                />

                {/* Mini analysis */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-success" />{" "}
                      Vocabulary
                    </span>
                    <span className="font-bold text-success">75%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-destructive" />{" "}
                      Grammar
                    </span>
                    <span className="font-bold text-destructive">45%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-warning" />{" "}
                      Reading
                    </span>
                    <span className="font-bold text-warning">60%</span>
                  </div>
                </div>

                {/* Badge ribbon */}
                <div className="text-center">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                    ⚠️ Almost Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hidden md:flex justify-center mt-16 animate-scroll-hint">
          <ChevronDown className="h-6 w-6 text-muted-foreground/40" />
        </div>
      </div>
    </section>
  );
}
