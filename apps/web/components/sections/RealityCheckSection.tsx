export function RealityCheckSection() {
  return (
    <section className="space-section bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 md:px-6 max-w-xl mx-auto text-center space-y-6">
        <p className="text-xl md:text-2xl font-bold font-heading leading-relaxed text-foreground">
          Sebagian besar peserta merasa persiapannya sudah cukup untuk
          menghadapi EPS-TOPIK.
        </p>

        <p className="text-lg text-muted-foreground leading-relaxed">
          Namun, hasil ujian tidak selalu sesuai dengan perkiraan mereka.
        </p>

        <div className="inline-block px-6 py-4 rounded-2xl bg-blue-50 border border-blue-100">
          <p className="text-primary font-semibold text-base md:text-lg">
            👉 Perbedaannya sering kali ada pada pengalaman mencoba soal dengan
            format ujian sebenarnya.
          </p>
        </div>
      </div>
    </section>
  );
}
