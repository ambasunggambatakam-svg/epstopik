import { Target, BarChart3, Brain, AlertTriangle } from "lucide-react";

export function ValueSection() {
  const values = [
    {
      icon: <Target className="h-5 w-5 text-primary" />,
      title: "Skor hasil pengerjaan kamu",
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-muted-foreground" />,
      title: "Level kemampuan saat ini",
    },
    {
      icon: <Brain className="h-5 w-5 text-primary" />,
      title: "Ringkasan area yang perlu ditingkatkan",
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-warning" />,
      title: "Gambaran kesiapan menghadapi ujian",
    },
  ];

  return (
    <section className="space-section bg-gray-50/50">
      <div className="container px-4 md:px-6 max-w-2xl mx-auto">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tight">
              Apa yang Akan Kamu Dapatkan?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Setelah mengerjakan simulasi, kamu akan melihat gambaran kemampuan
              kamu secara lebih jelas.
            </p>
          </div>

          <div className="space-y-4">
            {values.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center shrink-0 shadow-sm">
                  {item.icon}
                </div>
                <span className="font-medium">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
