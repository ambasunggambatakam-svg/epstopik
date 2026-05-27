import { Button } from "@repo/ui/button";
import { PlayCircle } from "lucide-react";
import Link from "next/link";

export function FinalPushSection() {
  return (
    <section className="space-section bg-gradient-to-b from-primary/5 to-primary/10 border-y border-primary/10">
      <div className="container px-4 md:px-6 max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-4xl font-extrabold font-heading tracking-tight">
            🚀 Saatnya Coba Simulasi Pertama Kamu
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Mulai dari simulasi singkat untuk melihat kemampuan kamu saat ini
            dalam EPS-TOPIK. Jika kamu sudah mengikuti penjelasan sebelumnya,
            sekarang waktunya mencoba langsung.
          </p>
        </div>

        <Button
          size="xl"
          className="shadow-xl shadow-primary/30 btn-ripple px-12"
          asChild
        >
          <Link href="/tryout">
            <PlayCircle className="mr-2 h-5 w-5" /> Mulai Simulasi Gratis
          </Link>
        </Button>

        <p className="text-xs text-muted-foreground">
          ⏱ Hanya 5 menit • Tanpa login • Hasil langsung
        </p>
      </div>
    </section>
  );
}
