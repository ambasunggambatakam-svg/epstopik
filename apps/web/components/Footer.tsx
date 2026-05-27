import Link from "next/link";

const footerLinks = {
  layanan: [
    { label: "Latihan Soal", href: "/latihan-soal" },
    { label: "Simulasi Ujian", href: "/simulasi-ujian" },
    { label: "Mini Tryout", href: "/tryout" },
    { label: "Cek Level", href: "/cek-level" },
  ],
  materi: [
    { label: "Kosakata EPS-TOPIK", href: "/kosakata-korea" },
    { label: "Grammar Korea", href: "/materi-belajar" },
    { label: "Tips Lulus", href: "/blog/tips-eps-topik" },
    { label: "Pengalaman TKI", href: "/blog/pengalaman-tki" },
  ],
  tentang: [
    { label: "Tentang Kami", href: "/tentang-kami" },
    { label: "Blog", href: "/blog" },
    { label: "WhatsApp", href: "https://wa.me/xxxxxxxxxx" },
    { label: "Kebijakan Privasi", href: "/privasi" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-gray-50/80">
      {/* Korean accent line */}
      <div className="korea-accent w-full" />

      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-extrabold text-lg">E</span>
              </div>
              <span className="text-lg font-extrabold tracking-tight font-heading">
                epstopik<span className="text-destructive">.id</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Platform simulasi & latihan EPS-TOPIK untuk calon pekerja Korea.
              Cek kesiapan kamu sebelum ujian.
            </p>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-bold font-heading mb-4 text-sm">Layanan</h4>
            <ul className="space-y-2.5">
              {footerLinks.layanan.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Materi */}
          <div>
            <h4 className="font-bold font-heading mb-4 text-sm">Materi</h4>
            <ul className="space-y-2.5">
              {footerLinks.materi.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tentang */}
          <div>
            <h4 className="font-bold font-heading mb-4 text-sm">Lainnya</h4>
            <ul className="space-y-2.5">
              {footerLinks.tentang.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} epstopik.id — Bagian dari ekosistem{" "}
            <Link
              href="https://kekorea.com"
              className="text-primary hover:underline"
            >
              kekorea.com
            </Link>
          </p>
          <p className="text-xs text-muted-foreground/60">
            Bukan lembaga resmi. Platform latihan mandiri.
          </p>
        </div>
      </div>
    </footer>
  );
}
