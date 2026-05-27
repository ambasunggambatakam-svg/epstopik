"use client";

import { Users, CreditCard, Activity, FileText, ArrowUpRight, ArrowDownRight, FileQuestion } from "lucide-react";
import { Button } from "@repo/ui/button";

const stats = [
  {
    name: "Total Users",
    value: "2,543",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    name: "Premium Users",
    value: "432",
    change: "+18.2%",
    trend: "up",
    icon: Activity,
    color: "bg-primary",
  },
  {
    name: "Revenue (Bulan Ini)",
    value: "Rp 10.8M",
    change: "-2.4%",
    trend: "down",
    icon: CreditCard,
    color: "bg-emerald-500",
  },
  {
    name: "Total Tryout Selesai",
    value: "12,401",
    change: "+24.5%",
    trend: "up",
    icon: FileText,
    color: "bg-orange-500",
  },
];

const recentTransactions = [
  { id: "TRX-1029", user: "Budi Santoso", email: "budi@example.com", amount: "Rp 25.000", status: "Success", date: "2 menit lalu" },
  { id: "TRX-1028", user: "Siti Aminah", email: "siti.a@example.com", amount: "Rp 25.000", status: "Pending", date: "15 menit lalu" },
  { id: "TRX-1027", user: "Agus Pratama", email: "agus.p@example.com", amount: "Rp 25.000", status: "Success", date: "1 jam lalu" },
  { id: "TRX-1026", user: "Dewi Lestari", email: "dewilestari@example.com", amount: "Rp 25.000", status: "Failed", date: "3 jam lalu" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Pantau performa platform EPSTOPIK.ID Anda hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                  <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-bold text-gray-900">Transaksi Terbaru</h2>
            <Button variant="outline" size="sm">Lihat Semua</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="px-6 py-4">ID Transaksi</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Nominal</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{trx.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{trx.user}</div>
                      <div className="text-xs text-gray-500">{trx.email}</div>
                    </td>
                    <td className="px-6 py-4">{trx.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        trx.status === 'Success' ? 'bg-green-100 text-green-700' :
                        trx.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {trx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{trx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / System Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Aksi Cepat</h2>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Buat Paket Tryout Baru
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileQuestion className="w-4 h-4 mr-2" />
                Tambah Soal ke Bank Soal
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="w-4 h-4 mr-2" />
                Manual Override Premium
              </Button>
            </div>
          </div>

          <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6">
            <h2 className="text-lg font-bold text-primary mb-2">Sistem Status</h2>
            <p className="text-sm text-gray-600 mb-4">
              Database tersinkronisasi. Semua layanan (API & Web) berjalan normal tanpa gangguan.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                All Systems Operational
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
