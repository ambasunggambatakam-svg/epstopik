import { Button } from "@repo/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function FinalPushSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-white">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-50/60 blur-[100px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-50/60 blur-[100px]" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-tight text-gray-900">
            Saatnya Coba <span className="text-blue-600 italic">Simulai CBT</span> Pertama Kamu
          </h2>

          <div className="flex flex-col items-center gap-6">
            <Button
              size="xl"
              className="text-lg md:text-xl px-12 py-8 rounded-full shadow-2xl shadow-blue-600/30 hover:-translate-y-1 transition-all duration-300"
              asChild
            >
              <Link href="/tryout">
                Mulai Simulasi Gratis <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
            
            <p className="text-sm font-medium text-gray-500 flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500"/> 100% Gratis & tanpa login</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500"/> 100+ latihan interaktif</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500"/> Bisa diakses kapan saja</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
