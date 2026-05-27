import { BookOpen, BarChart3, Target } from "lucide-react";

export function TrustSection() {
  const points = [
    {
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      text: "Soal mengikuti pola EPS-TOPIK terbaru",
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-primary" />,
      text: "Tingkat kesulitan dibuat mendekati kondisi ujian asli",
    },
    {
      icon: <Target className="h-5 w-5 text-primary" />,
      text: "Dirancang untuk melatih pemahaman, bukan sekadar hafalan",
    },
  ];

  return (
    <section className="space-section bg-white">
      <div className="container px-4 md:px-6 max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tight">
            Tentang Simulasi Ini
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            epstopik.id digunakan sebagai sarana latihan oleh calon peserta
            EPS-TOPIK untuk memahami kesiapan mereka sebelum ujian.
          </p>
        </div>

        <div className="space-y-4 text-left">
          {points.map((point, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded-xl bg-gray-50"
            >
              <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center shrink-0 shadow-sm">
                {point.icon}
              </div>
              <p className="font-medium text-sm md:text-base leading-relaxed pt-2">
                {point.text}
              </p>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="pt-4">
          <p className="text-sm text-muted-foreground">
            ✨ Digunakan oleh calon peserta EPS-TOPIK dari seluruh Indonesia
          </p>
        </div>
      </div>
    </section>
  );
}
