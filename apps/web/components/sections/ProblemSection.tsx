export function ProblemSection() {
  const problems = [
    "Belajar tanpa tahu level kemampuan saat ini",
    "Belum pernah mencoba soal dengan format ujian asli",
    "Baru sadar tingkat kesulitan saat ujian berlangsung",
    "Tidak tahu bagian mana yang perlu diperbaiki",
  ];

  return (
    <section className="space-section bg-white">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tight">
              Masalah yang Sering Dialami Peserta EPS-TOPIK
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Banyak orang sudah belajar, tapi tetap tidak yakin dengan
              kemampuan mereka sendiri.
            </p>
          </div>

          <div className="space-y-4">
            {problems.map((problem, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-red-50/50 transition-colors"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-destructive text-lg shrink-0">❌</span>
                <p className="text-foreground leading-relaxed">{problem}</p>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <p className="text-muted-foreground leading-relaxed">
              👉 Akibatnya:{" "}
              <span className="font-bold text-foreground">
                Persiapan terasa cukup, tetapi hasil ujian tidak sesuai harapan.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
