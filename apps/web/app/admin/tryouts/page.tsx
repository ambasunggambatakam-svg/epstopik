"use client";

import { Button } from "@repo/ui/button";
import { Search, Plus, Edit, Trash, Eye, Settings2 } from "lucide-react";

const tryouts = [
  { id: "TO-01", title: "Tryout Mini Gratis", type: "MINI", questionsCount: 10, duration: 15, isPremium: false, status: "Published" },
  { id: "TO-02", title: "Tryout Full EPS-TOPIK 1", type: "FULL", questionsCount: 40, duration: 50, isPremium: true, status: "Published" },
  { id: "TO-03", title: "Tryout Full EPS-TOPIK 2", type: "FULL", questionsCount: 40, duration: 50, isPremium: true, status: "Draft" },
];

export default function AdminTryoutsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Manajemen Tryout</h1>
          <p className="text-gray-500 mt-1">Kelola paket tryout, atur durasi, jumlah soal, dan hak akses.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Buat Paket Baru
        </Button>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm">
        {/* Table Controls */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Cari nama tryout..."
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Tryouts Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="px-6 py-4">Nama Paket</th>
                <th className="px-6 py-4">Tipe & Konfigurasi</th>
                <th className="px-6 py-4">Hak Akses</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tryouts.map((to) => (
                <tr key={to.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{to.title}</div>
                    <div className="text-xs text-gray-500">{to.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-700">{to.type} Mode</div>
                    <div className="text-xs text-gray-500">{to.questionsCount} Soal • {to.duration} Menit</div>
                  </td>
                  <td className="px-6 py-4">
                    {to.isPremium ? (
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-semibold text-xs">PREMIUM</span>
                    ) : (
                      <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 font-semibold text-xs">FREE</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      to.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {to.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 px-2 text-gray-600 hover:text-primary" title="Preview">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2 text-gray-600 hover:text-primary" title="Atur Soal">
                        <Settings2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2 text-gray-600 hover:text-primary">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
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
