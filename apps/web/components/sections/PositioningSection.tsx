import { BookOpen, BarChart3, Brain } from "lucide-react";

export function PositioningSection() {
  const values = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Soal menyerupai ujian asli",
      desc: "Dirancang berdasarkan pola dan tingkat kesulitan EPS-TOPIK terbaru",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Skor langsung keluar",
      desc: "Setelah selesai, kamu langsung tahu skor dan level kemampuanmu",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Analisis kemampuan per bagian",
      desc: "Ketahui kekuatan dan kelemahanmu di setiap area ujian",
    },
  ];

  return (
    <section className="space-section bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              Bukan sekadar latihan biasa
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tight">
              Mengetahui Kesiapan Kamu
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              epstopik.id membantu kamu menjawab satu pertanyaan penting:{" "}
              <span className="font-semibold text-foreground">
                &ldquo;Apakah saya sudah siap lulus EPS-TOPIK?&rdquo;
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((item, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl border bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold font-heading mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
