"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@repo/ui/button";
import { getCurrentUser, logout } from "../lib/auth";
import { User, LogOut, LayoutDashboard } from "lucide-react";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Latihan Soal", href: "/latihan-soal" },
  { label: "Simulasi Ujian", href: "/simulasi-ujian" },
  { label: "Tryout", href: "/tryout" },
  { label: "Harga", href: "#pricing" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setUser(getCurrentUser());
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      {/* Korean accent line */}
      <div className="korea-accent w-full" />

      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
            <span className="text-white font-extrabold text-lg">E</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight font-heading">
              epstopik<span className="text-destructive">.id</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isClient ? (
            user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="hidden lg:inline">{user.email?.split('@')[0]}</span>
                </div>
                {user.role === 'ADMIN' && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm" className="gap-2 border-primary/20 text-primary hover:bg-primary/5">
                      <LayoutDashboard className="w-4 h-4" /> Admin Panel
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={logout} className="text-gray-500 hover:text-red-600">
                  <LogOut className="w-4 h-4 mr-2" /> Keluar
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="shadow-md shadow-primary/20">
                    Daftar Gratis
                  </Button>
                </Link>
              </>
            )
          ) : (
            <div className="w-40 h-9 bg-gray-100 rounded-lg animate-pulse" />
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`block h-0.5 w-full bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block h-0.5 w-full bg-foreground transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-full bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white animate-fade-in">
          <nav className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium text-muted-foreground rounded-xl hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            
            <div className="mt-4 border-t pt-4 px-4">
              {isClient && user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.email?.split('@')[0]}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                  {user.role === 'ADMIN' && (
                    <Link href="/admin" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full justify-start text-primary border-primary/20">
                        <LayoutDashboard className="w-4 h-4 mr-2" /> Admin Panel
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" onClick={logout} className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                    <LogOut className="w-4 h-4 mr-2" /> Keluar
                  </Button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Masuk
                    </Button>
                  </Link>
                  <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full shadow-md shadow-primary/20">
                      Daftar Gratis
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
