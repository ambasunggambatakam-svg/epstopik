"use client";

import { Button } from "@repo/ui/button";
import { CheckCircle2, X } from "lucide-react";

interface PricingCardProps {
  plan: "free" | "premium";
  highlighted?: boolean;
}

const plans = {
  free: {
    name: "FREE",
    price: "Rp 0",
    originalPrice: null,
    period: "Selamanya",
    badge: null,
    features: [
      { text: "Materi Bab 1–60", included: true },
      { text: "Latihan soal per bab", included: true },
      { text: "Latihan soal harian", included: true },
      { text: "Tryout Mini (1–2x)", included: true },
      { text: "Gamifikasi (XP & level)", included: true },
      { text: "Leaderboard", included: true },
      { text: "Skor & pembahasan dasar", included: true },
      { text: "Tracking progress belajar", included: true },
      { text: "Tryout Full Simulation", included: false },
      { text: "Materi kosakata Premium", included: false },
      { text: "Pembahasan detail per soal", included: false },
      { text: "Bebas iklan", included: false },
    ],
    cta: "Mulai Gratis",
    ctaVariant: "outline" as const,
  },
  premium: {
    name: "PREMIUM",
    price: "Rp 25.000",
    originalPrice: "Rp 49.000",
    period: "/ bulan",
    badge: "Early Access Price 🔥",
    features: [
      { text: "Semua fitur Free", included: true },
      { text: "Akses soal tanpa batas", included: true },
      { text: "Tryout Full Simulation", included: true },
      { text: "Materi kosakata Premium", included: true },
      { text: "Pembahasan detail (step-by-step)", included: true },
      { text: "Analisis kelemahan per topik", included: true },
      { text: "Rekomendasi belajar otomatis", included: true },
      { text: "Insight kesiapan ujian", included: true },
      { text: "Paket tryout berbagai level", included: true },
      { text: "Bebas iklan", included: true },
      { text: "Evaluasi performa lengkap", included: true },
    ],
    cta: "Mulai Premium",
    ctaVariant: "default" as const,
  },
};

export function PricingCard({ plan, highlighted = false }: PricingCardProps) {
  const data = plans[plan];

  return (
    <div
      className={`
        relative rounded-2xl border-2 p-8 transition-all duration-300
        ${
          highlighted
            ? "border-primary bg-white shadow-xl shadow-primary/10 scale-[1.02]"
            : "border-gray-200 bg-white hover:border-primary/30"
        }
      `}
    >
      {/* Badge */}
      {data.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            {data.badge}
          </span>
        </div>
      )}

      {/* Plan Name */}
      <div className="text-center mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
          {data.name}
        </h3>
        <div className="flex items-baseline justify-center gap-2">
          {data.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              {data.originalPrice}
            </span>
          )}
          <span
            className={`text-4xl font-extrabold font-heading ${highlighted ? "text-primary" : "text-foreground"}`}
          >
            {data.price}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{data.period}</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {data.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            {feature.included ? (
              <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
            ) : (
              <X className="h-5 w-5 text-gray-300 shrink-0 mt-0.5" />
            )}
            <span
              className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground/50"}`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant={data.ctaVariant}
        size="lg"
        className={`w-full ${highlighted ? "shadow-lg shadow-primary/20" : ""}`}
        onClick={async () => {
          if (plan === "premium") {
            try {
              // Call API to create Doku checkout invoice
              const res = await fetch("http://localhost:3001/api/payments/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: "user@example.com", planId: plan }), // Dummy email for MVP
              });
              const data = await res.json();
              if (data.success && data.paymentUrl) {
                // Redirect to Doku checkout URL
                window.location.href = data.paymentUrl;
              }
            } catch (err) {
              console.error("Failed to checkout", err);
              alert("Terjadi kesalahan saat memproses pembayaran.");
            }
          } else {
            // Free plan behavior (e.g. scroll to tryout or register)
            window.location.href = "/tryout";
          }
        }}
      >
        {data.cta}
      </Button>
    </div>
  );
}
