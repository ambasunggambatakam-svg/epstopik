"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { Search, Plus, Edit, Trash, Eye, Settings2 } from "lucide-react";
import { fetchApi } from "../../../lib/api";

type Quiz = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  duration: number;
  isPremium: boolean;
  status: string;
  _count?: { questions: number };
};

export default function AdminTryoutsPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newData, setNewData] = useState({
    title: "",
    description: "",
    type: "FULL",
    duration: 60,
    isPremium: false,
    status: "Draft"
  });

  useEffect(() => {
    fetchApi('/admin/quizzes')
      .then(data => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    if (!newData.title) return alert("Judul wajib diisi!");
    try {
      if (editingId) {
        const data = await fetchApi(`/admin/quizzes/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(newData)
        });
        setQuizzes(quizzes.map(q => q.id === editingId ? { ...q, ...data } : q));
      } else {
        const data = await fetchApi('/admin/quizzes', {
          method: 'POST',
          body: JSON.stringify(newData)
        });
        setQuizzes([data, ...quizzes]);
      }
      setIsAdding(false);
      setEditingId(null);
    } catch (err: any) {
      alert("Gagal menyimpan: " + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus tryout ini?")) return;
    try {
      await fetchApi(`/admin/quizzes/${id}`, { method: 'DELETE' });
      setQuizzes(quizzes.filter(q => q.id !== id));
    } catch (err: any) {
      alert("Gagal menghapus: " + err.message);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setNewData({ title: "", description: "", type: "FULL", duration: 60, isPremium: false, status: "Draft" });
    setIsAdding(true);
  };

  const openEditModal = (q: Quiz) => {
    setEditingId(q.id);
    setNewData({
      title: q.title,
      description: q.description || "",
      type: q.type,
      duration: q.duration,
      isPremium: q.isPremium,
      status: q.status
    });
    setIsAdding(true);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Manajemen Tryout</h1>
          <p className="text-gray-500 mt-1">Kelola paket tryout, atur durasi, jumlah soal, dan hak akses.</p>
        </div>
        <Button onClick={openAddModal}>
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
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-500">Memuat data...</td></tr>
              ) : quizzes.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-500">Belum ada paket tryout.</td></tr>
              ) : quizzes.map((to) => (
                <tr key={to.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{to.title}</div>
                    <div className="text-xs text-gray-500">{to.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-700">{to.type} Mode</div>
                    <div className="text-xs text-gray-500">{to._count?.questions || 0} Soal • {to.duration} Menit</div>
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
                      <Button variant="outline" size="sm" className="h-8 px-2 text-gray-600 hover:text-primary" title="Atur Soal">
                        <Settings2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2 text-gray-600 hover:text-primary" onClick={() => openEditModal(to)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2 text-red-600 hover:bg-red-50" onClick={() => handleDelete(to.id)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold font-heading text-gray-900">
                {editingId ? 'Edit Tryout' : 'Tambah Tryout Baru'}
              </h2>
              <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="p-6 space-y-5 overflow-y-auto">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Nama Paket <span className="text-red-500">*</span></label>
                <input 
                  className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Contoh: Tryout EPS-TOPIK 1"
                  value={newData.title}
                  onChange={(e) => setNewData({...newData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Tipe</label>
                  <select 
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-sm bg-white"
                    value={newData.type}
                    onChange={(e) => setNewData({...newData, type: e.target.value})}
                  >
                    <option value="FULL">FULL Mode</option>
                    <option value="MINI">MINI Mode</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Durasi (Menit)</label>
                  <input 
                    type="number"
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-sm"
                    value={newData.duration}
                    onChange={(e) => setNewData({...newData, duration: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Hak Akses</label>
                  <select 
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-sm bg-white"
                    value={newData.isPremium ? 'true' : 'false'}
                    onChange={(e) => setNewData({...newData, isPremium: e.target.value === 'true'})}
                  >
                    <option value="false">FREE</option>
                    <option value="true">PREMIUM</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Status</label>
                  <select 
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-sm bg-white"
                    value={newData.status}
                    onChange={(e) => setNewData({...newData, status: e.target.value})}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Deskripsi Singkat (Opsional)</label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm"
                  rows={3}
                  value={newData.description}
                  onChange={(e) => setNewData({...newData, description: e.target.value})}
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAdding(false)}>Batal</Button>
              <Button onClick={handleSave}>Simpan Tryout</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
