"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  // Ganti dengan nomor WhatsApp asli nanti
  const whatsappNumber = "6281234567890";
  const message = "Halo kak, saya ingin bertanya tentang epstopik.id";

  return (
    <Link
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 animate-fade-in"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </Link>
  );
}
