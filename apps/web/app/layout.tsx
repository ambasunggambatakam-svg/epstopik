import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EPSTOPIK.ID — Cek Kesiapan & Simulasi EPS-TOPIK Online",
  description:
    "Cek peluang lulus EPS-TOPIK dengan simulasi ujian gratis. 10 soal, 5 menit, hasil langsung + analisis kemampuan. Tanpa login.",
  keywords: [
    "EPS-TOPIK",
    "simulasi EPS-TOPIK",
    "latihan EPS-TOPIK",
    "tryout EPS-TOPIK",
    "kerja di Korea",
    "bahasa Korea",
    "tes EPS-TOPIK online",
  ],
  openGraph: {
    title: "EPSTOPIK.ID — Cek Kesiapan EPS-TOPIK Kamu",
    description:
      "Simulasi ujian EPS-TOPIK gratis. Ketahui skor, level, dan peluang lulus kamu dalam 5 menit.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
