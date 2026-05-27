"use client";

import { Button } from "@repo/ui/button";
import { Search, Filter, ShieldCheck, Download } from "lucide-react";

const transactions = [
  { id: "TRX-1029", user: "Budi Santoso", email: "budi@example.com", amount: "Rp 25.000", status: "Success", date: "2026-05-26 14:02" },
  { id: "TRX-1028", user: "Siti Aminah", email: "siti.a@example.com", amount: "Rp 25.000", status: "Pending", date: "2026-05-26 13:45" },
  { id: "TRX-1027", user: "Agus Pratama", email: "agus.p@example.com", amount: "Rp 25.000", status: "Success", date: "2026-05-26 12:30" },
  { id: "TRX-1026", user: "Dewi Lestari", email: "dewilestari@example.com", amount: "Rp 25.000", status: "Failed", date: "2026-05-26 10:15" },
];

export default function AdminTransactionsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Manajemen Transaksi</h1>
          <p className="text-gray-500 mt-1">Pantau pembayaran, rekonsiliasi, dan aktivasi manual (override).</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50 rounded-t-2xl">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Cari ID Transaksi atau User..."
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Filter className="w-4 h-4 mr-2" />
              Filter Status
            </Button>
          </div>
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
                <th className="px-6 py-4 text-right">Manual Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{trx.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{trx.user}</div>
                    <div className="text-xs text-gray-500">{trx.email}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-700">{trx.amount}</td>
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
                  <td className="px-6 py-4 text-right">
                    {trx.status !== 'Success' && (
                      <Button size="sm" variant="outline" className="h-8 text-primary border-primary hover:bg-primary/10">
                        <ShieldCheck className="w-4 h-4 mr-1.5" />
                        Set Lunas
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
