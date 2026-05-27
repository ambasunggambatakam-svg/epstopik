import { Button } from "@repo/ui/button";
import { CheckCircle2, XCircle, BarChart3, MessageSquare } from "lucide-react";
import Link from "next/link";

interface QuizResultProps {
  score: number;
  total: number;
  level: string;
  analysis: {
    vocabulary: "Lumayan" | "Baik" | "Lemah" | "Sangat Baik";
    grammar: "Lumayan" | "Baik" | "Lemah" | "Sangat Baik";
    listening: "Lumayan" | "Baik" | "Lemah" | "Perlu latihan";
  };
}

export function QuizResult({ score, total, level, analysis }: QuizResultProps) {
  const getStatusIcon = (status: string) => {
    if (status === "Lemah" || status === "Perlu latihan") {
      return <XCircle className="h-5 w-5 text-destructive" />;
    }
    return <CheckCircle2 className="h-5 w-5 text-green-500" />;
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-3xl border shadow-xl">
      <div className="text-center space-y-4 mb-10">
        <h2 className="text-2xl font-bold tracking-tight">🎯 Hasil Kamu</h2>
        <div className="text-6xl font-black text-primary">
          {score} <span className="text-2xl text-muted-foreground">/ {total}</span>
        </div>
        <div className="text-xl font-bold bg-primary/5 text-primary py-2 px-4 rounded-full inline-block">
          Level: {level}
        </div>
      </div>

      <div className="space-y-6 mb-10">
        <div className="flex items-center gap-2 font-bold text-lg">
          <BarChart3 className="h-5 w-5" /> Analisis
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-3">
              {getStatusIcon(analysis.vocabulary)}
              <span className="font-medium">Vocabulary</span>
            </div>
            <span className="font-bold">{analysis.vocabulary}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-3">
              {getStatusIcon(analysis.grammar)}
              <span className="font-medium">Grammar</span>
            </div>
            <span className="font-bold">{analysis.grammar}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-3">
              {getStatusIcon(analysis.listening)}
              <span className="font-medium">Listening</span>
            </div>
            <span className="font-bold">{analysis.listening}</span>
          </div>
        </div>
        <p className="text-center text-muted-foreground italic px-4">
          Kamu sudah punya dasar, tapi belum cukup untuk lulus EPS-TOPIK.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-destructive/5 border border-destructive/10 p-6 rounded-2xl text-center">
          <h4 className="font-bold text-destructive mb-2">🔥 Mau tahu peluang kamu lulus?</h4>
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg" asChild>
            <Link href="https://wa.me/xxxxxxxxxx">
              <MessageSquare className="mr-2 h-5 w-5" /> Gabung WhatsApp Channel
            </Link>
          </Button>
        </div>
        <Button variant="outline" className="w-full" size="lg">Coba Lagi</Button>
      </div>
    </div>
  );
}
