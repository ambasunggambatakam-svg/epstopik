import { PricingCard } from "../PricingCard";

export function PricingSection() {
  return (
    <section id="pricing" className="space-section bg-gray-50/50">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              Pilih Paket
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tight">
              Mulai Gratis, Upgrade Kapan Saja
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Coba latihan gratis dulu. Temukan apakah kamu sudah siap
              menghadapi simulasi ujian penuh.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto items-center">
            <div className="md:pr-4">
              <PricingCard plan="free" />
            </div>
            <div className="transform md:scale-110 relative z-10">
              <PricingCard plan="premium" highlighted />
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            💡 CTA diarahkan ke Latihan Tryout / Mini Tryout
          </p>
        </div>
      </div>
    </section>
  );
}
