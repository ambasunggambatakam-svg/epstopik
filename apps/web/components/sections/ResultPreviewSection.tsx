"use client";

import { Badge } from "../Badge";
import { ProgressBar } from "../ProgressBar";
import { AnimatedCounter } from "../AnimatedCounter";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export function ResultPreviewSection() {
  return (
    <section className="space-section bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              Contoh Hasil
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tight">
              Hasil yang Akan Kamu Dapatkan
            </h2>
            <p className="text-muted-foreground">
              Setelah mini tryout, kamu akan langsung melihat posisi kemampuan
              kamu secara jelas.
            </p>
          </div>

          {/* Result Card Mockup */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-xl p-8 space-y-6">
            {/* Score */}
            <div className="text-center space-y-3">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                📊 Skor Simulasi
              </p>
              <div className="text-5xl font-extrabold font-heading text-primary">
                <AnimatedCounter target={6} />
                <span className="text-2xl text-muted-foreground font-normal">
                  {" "}
                  / 10
                </span>
              </div>
              <Badge level="intermediate" size="lg" animated />
            </div>

            {/* Progress */}
            <ProgressBar
              value={60}
              size="lg"
              color="warning"
              label="Progress"
              showLabel
            />

            {/* Analysis */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle2 className="h-4 w-4 text-success" /> Vocabulary
                </span>
                <span className="text-sm font-bold text-success">Cukup</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <XCircle className="h-4 w-4 text-destructive" /> Grammar
                </span>
                <span className="text-sm font-bold text-destructive">
                  Perlu perbaikan
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <AlertTriangle className="h-4 w-4 text-warning" /> Listening
                </span>
                <span className="text-sm font-bold text-warning">
                  Masih lemah
                </span>
              </div>
            </div>

            {/* Prediction */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <p className="text-sm text-amber-800 font-medium">
                📉 Estimasi kesiapan lulus:{" "}
                <span className="font-bold">±50%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
