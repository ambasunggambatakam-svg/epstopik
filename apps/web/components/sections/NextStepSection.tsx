import { Button } from "@repo/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function NextStepSection() {
  return (
    <section className="space-section bg-white">
      <div className="container px-4 md:px-6 max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tight">
            🚀 Sudah Tahu Kemampuan Kamu?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Kalau ingin melanjutkan latihan, kamu bisa mencoba tryout dengan
            tingkat kesulitan yang lebih tinggi.
          </p>
        </div>

        <div className="space-y-3 text-left max-w-md mx-auto">
          {[
            "Soal lebih mendekati ujian asli",
            "Evaluasi kemampuan lebih detail",
            "Simulasi yang lebih realistis",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          👉 Tujuannya untuk membantu kamu meningkatkan kesiapan secara
          bertahap.
        </p>

        <Button
          size="xl"
          className="shadow-lg shadow-primary/25 btn-ripple"
          asChild
        >
          <Link href="/tryout">
            <ArrowRight className="mr-2 h-5 w-5" /> Lanjut Tryout
          </Link>
        </Button>
      </div>
    </section>
  );
}
