"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FileText, 
  CreditCard, 
  Settings, 
  LogOut,
  Menu,
  X,
  FileQuestion,
  Languages
} from "lucide-react";
import { useState, useEffect } from "react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Bank Soal", href: "/admin/questions", icon: FileQuestion },
  { name: "Tryout Packages", href: "/admin/tryouts", icon: FileText },
  { name: "Transactions", href: "/admin/transactions", icon: CreditCard },
  { name: "Materi Belajar", href: "/admin/materi", icon: BookOpen },
  { name: "Kosakata", href: "/admin/kosakata", icon: Languages },
  { name: "Blog / Artikel", href: "/admin/blog", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    import("../../lib/auth").then(({ getCurrentUser }) => {
      const user = getCurrentUser();
      if (!user || user.role !== 'ADMIN') {
        window.location.href = "/";
      } else {
        setIsAuthorized(true);
      }
    });
  }, []);

  if (!isAuthorized) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-pulse flex items-center gap-2"><div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" /> Memeriksa akses...</div></div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl font-heading">
            <span className="text-primary">Admin</span>Panel
          </Link>
          <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/admin');
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-gray-400"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-400" />
            Keluar
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header (Mobile mainly) */}
        <header className="flex lg:hidden h-16 items-center gap-4 border-b bg-white px-6">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="font-bold text-lg font-heading">Admin Panel</div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
