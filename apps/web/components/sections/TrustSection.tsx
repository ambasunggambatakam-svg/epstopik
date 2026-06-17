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
        <div className="pt-8 border-t border-gray-100 flex flex-col items-center justify-center space-y-4">
          <div className="w-full max-w-sm aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
            <span className="text-sm text-gray-400">Placeholder: Gambar pria AI di Korea</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center text-[10px] font-bold text-primary">
                  P
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold text-muted-foreground">
              Bergabung bersama <span className="text-primary font-bold">12.400+</span> peserta lainnya
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
