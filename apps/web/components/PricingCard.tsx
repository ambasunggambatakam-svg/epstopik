"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@repo/ui/button";
import Link from "next/link";
import { useState } from "react";

interface PricingCardProps {
  plan: "free" | "premium";
  highlighted?: boolean;
}

export function PricingCard({ plan, highlighted }: PricingCardProps) {
  const [loading, setLoading] = useState(false);

  type PlanType = {
    name: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    buttonText: string;
    buttonAction?: string;
  };

  const plans: Record<"free" | "premium", PlanType> = {
    free: {
      name: "Basic Free",
      price: "Rp 0",
      description: "Mulai belajar dan cek kemampuan",
      features: [
        "Akses materi dasar",
        "Mini Tryout (10 soal)",
        "Kosakata harian terbatas",
        "Hasil analisis standar",
      ],
      buttonText: "Daftar Gratis",
      buttonAction: "/register",
    },
    premium: {
      name: "Premium Pro",
      price: "Rp 99.000",
      period: "/bulan",
      description: "Akses penuh fitur lulus ujian",
      features: [
        "Semua fitur Basic Free",
        "Tryout Penuh (40 soal + Waktu)",
        "Pembahasan detail tiap soal",
        "Kosakata EPS-TOPIK lengkap",
        "Audio listening native",
        "Prioritas support WA",
      ],
      buttonText: "Upgrade Premium",
    },
  };

  const currentPlan = plans[plan];

  const handleCheckout = async () => {
    if (plan === "free") return;
    setLoading(true);
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 99000, plan: "premium" }),
      });
      const data = await res.json();
      if (data.invoiceUrl) {
        window.location.href = data.invoiceUrl;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // The premium card is significantly larger and has blue styling
  const isPremium = plan === "premium";

  return (
    <div
      className={`relative rounded-3xl border ${
        isPremium
          ? "bg-blue-600 text-white shadow-2xl shadow-blue-600/30 border-blue-600 p-8 md:p-12 transform md:scale-105 z-10"
          : "bg-white text-gray-900 border-gray-100 shadow-xl p-8 md:p-10"
      }`}
    >
      {isPremium && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
          Paling Populer
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className={`text-2xl font-bold font-heading ${isPremium ? 'text-white' : 'text-gray-900'}`}>{currentPlan.name}</h3>
          <p className={isPremium ? "text-blue-100 font-medium" : "text-gray-500 font-medium"}>
            {currentPlan.description}
          </p>
        </div>

        <div className="flex items-baseline text-4xl md:text-5xl font-extrabold font-heading">
          {currentPlan.price}
          {currentPlan.period && (
            <span className={`text-lg ml-2 font-medium ${isPremium ? 'text-blue-200' : 'text-gray-500'}`}>
              {currentPlan.period}
            </span>
          )}
        </div>

        <ul className="space-y-4 pt-6 border-t border-opacity-20 border-gray-400">
          {currentPlan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className={`h-6 w-6 shrink-0 ${isPremium ? 'text-blue-200' : 'text-green-500'}`} />
              <span className={`font-medium ${isPremium ? 'text-white' : 'text-gray-700'}`}>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="pt-8">
          {plan === "free" ? (
            <Button
              className="w-full h-14 text-lg font-bold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 border-none"
              asChild
            >
              <Link href={currentPlan.buttonAction || "#"}>{currentPlan.buttonText}</Link>
            </Button>
          ) : (
            <Button
              className="w-full h-14 text-lg font-bold rounded-xl bg-white text-blue-600 hover:bg-gray-50 border-none shadow-lg shadow-white/10 transition-transform hover:scale-105"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Memproses..." : currentPlan.buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
