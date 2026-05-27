"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "../../lib/auth";
import { useRouter } from "next/navigation";
import { BookOpen, Trophy, Clock, ArrowRight } from "lucide-react";
import { Button } from "@repo/ui/button";
import { Header } from "../../components/Header";
import Link from "next/link";

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Memuat Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900">
            Halo, {user?.name || user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-gray-500 mt-2">
            Selamat datang di Dashboard pembelajaran Anda. Mari persiapkan ujian EPS-TOPIK hari ini!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
          {/* Stat Card 1 */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
            <div className="p-4 rounded-xl bg-blue-50 text-blue-500">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Paket Tryout Aktif</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
          
          {/* Stat Card 2 */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
            <div className="p-4 rounded-xl bg-orange-50 text-orange-500">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Rata-rata Nilai</p>
              <p className="text-2xl font-bold text-gray-900">-</p>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
            <div className="p-4 rounded-xl bg-green-50 text-green-500">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Waktu Belajar</p>
              <p className="text-2xl font-bold text-gray-900">0 Jam</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Tryout Terbaru Anda</h2>
              </div>
              <div className="text-center py-12 px-4 border-2 border-dashed rounded-xl border-gray-200">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-gray-900 font-medium mb-1">Belum ada tryout</h3>
                <p className="text-gray-500 text-sm mb-4">Anda belum mengikuti simulasi tryout apapun.</p>
                <Link href="/tryout">
                  <Button>
                    Mulai Tryout Pertama
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6">
              <h2 className="text-lg font-bold text-primary mb-2">Status Akun</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-700 border shadow-sm">
                  {user?.role === 'ADMIN' ? 'ADMINISTRATOR' : user?.role || 'FREE'}
                </div>
              </div>
              
              {user?.role !== 'PREMIUM' && user?.role !== 'ADMIN' && (
                <>
                  <p className="text-sm text-gray-600 mb-4">
                    Tingkatkan ke paket Premium untuk mendapatkan akses penuh ke semua soal dan fitur simulasi CBT.
                  </p>
                  <Button className="w-full shadow-md shadow-primary/20">
                    Upgrade ke Premium
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
