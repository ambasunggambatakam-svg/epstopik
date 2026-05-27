import { MessageSquare, BookOpen, Brain, BarChart3 } from "lucide-react";
import { Button } from "@repo/ui/button";
import Link from "next/link";

export function WhatsAppSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4 md:px-6 max-w-xl mx-auto text-center space-y-6">
        <p className="text-muted-foreground text-sm leading-relaxed">
          Kalau kamu ingin mendapatkan update soal terbaru dan pembahasan
          EPS-TOPIK, kamu bisa bergabung ke WhatsApp Channel kami.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" /> Update soal terbaru
          </span>
          <span className="flex items-center gap-1.5">
            <Brain className="h-3.5 w-3.5" /> Tips & pembahasan
          </span>
          <span className="flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5" /> Info latihan
          </span>
        </div>

        <Button variant="outline" size="sm" asChild>
          <Link href="https://wa.me/xxxxxxxxxx">
            <MessageSquare className="mr-2 h-4 w-4" /> Gabung WhatsApp Channel
          </Link>
        </Button>
      </div>
    </section>
  );
}
