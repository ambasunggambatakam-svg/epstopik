import { Button } from "@repo/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function RealityCheckSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-50/50 rounded-full blur-3xl -z-10" />

      <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center space-y-8 relative z-10">
        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-widest mb-2">
          Coba Sekarang
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-gray-900 tracking-tight leading-tight">
          Cek Kesiapan Kamu Sekarang
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium">
          Jangan hanya menebak-nebak, lihat langsung apakah kamu sudah siap menghadapi ujian EPS-TOPIK.
        </p>
        
        <div className="pt-6">
          <Button size="xl" className="shadow-xl shadow-blue-600/20 text-lg px-10 py-6 rounded-full hover:scale-105 transition-transform" asChild>
            <Link href="/tryout">
              Cek Sekarang Juga <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
