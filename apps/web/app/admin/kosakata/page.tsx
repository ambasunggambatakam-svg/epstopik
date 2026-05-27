"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { Search, Plus, Trash, Languages, Edit } from "lucide-react";
import { fetchApi } from "../../../lib/api";

type Kosakata = {
  id: string;
  korean: string;
  meaning: string;
  category: string;
  exampleSent: string | null;
  createdAt: string;
};

export default function AdminKosakataPage() {
  const [kosakatas, setKosakatas] = useState<Kosakata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newData, setNewData] = useState({
    korean: "",
    meaning: "",
    category: "",
    exampleSent: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchApi('/admin/kosakata');
      setKosakatas(data);
      setError(null);
    } catch (err: any) {
      setError("Gagal memuat kosakata: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus kosakata ini?")) return;
    try {
      await fetchApi(`/admin/kosakata/${id}`, { method: 'DELETE' });
      setKosakatas(kosakatas.filter(k => k.id !== id));
    } catch (err: any) {
      alert("Gagal menghapus: " + err.message);
    }
  };

  const handleSave = async () => {
    if (!newData.korean || !newData.meaning) {
      alert("Kata Korea dan Artinya wajib diisi!");
      return;
    }
    
    try {
      if (editingId) {
        const data = await fetchApi(`/admin/kosakata/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(newData)
        });
        setKosakatas(kosakatas.map(k => k.id === editingId ? data : k));
      } else {
        const data = await fetchApi('/admin/kosakata', {
          method: 'POST',
          body: JSON.stringify(newData)
        });
        setKosakatas([data, ...kosakatas]);
      }
      setIsAdding(false);
      setEditingId(null);
      setNewData({ korean: "", meaning: "", category: "", exampleSent: "" });
    } catch (err: any) {
      alert("Gagal menyimpan: " + err.message);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setNewData({ korean: "", meaning: "", category: "", exampleSent: "" });
    setIsAdding(true);
  };

  const openEditModal = (k: Kosakata) => {
    setEditingId(k.id);
    setNewData({
      korean: k.korean,
      meaning: k.meaning,
      category: k.category || "",
      exampleSent: k.exampleSent || ""
    });
    setIsAdding(true);
  };

  return (
    <>
      <div className="space-y-6 animate-fade-in relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-gray-900">Manajemen Kamus Kosakata</h1>
            <p className="text-gray-500 mt-1">Tambah perbendaharaan kata EPS-TOPIK untuk user.</p>
          </div>
          <Button onClick={openAddModal}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Kosakata
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl border shadow-sm">
          <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50 rounded-t-2xl">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Cari huruf Hangeul atau arti..."
                className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Memuat data...</div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="px-6 py-4">Kata (Korea)</th>
                    <th className="px-6 py-4">Arti (Indonesia)</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4">Contoh Kalimat</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {kosakatas.map((k) => (
                    <tr key={k.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-lg text-gray-900">
                        {k.korean}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {k.meaning}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">{k.category || '-'}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 italic max-w-xs truncate" title={k.exampleSent || ''}>
                        {k.exampleSent || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="h-8 px-2 text-gray-600 hover:text-blue-600" onClick={() => openEditModal(k)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 px-2 text-gray-600 hover:text-red-600" onClick={() => handleDelete(k.id)}>
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {kosakatas.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        Belum ada kosakata yang ditambahkan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-xl flex flex-col shadow-2xl border overflow-hidden">
              <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50/50 sticky top-0 z-10">
                <h2 className="text-xl font-bold font-heading text-gray-900">
                  {editingId ? 'Edit Kosakata' : 'Tambah Kosakata'}
                </h2>
                <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div className="p-6 space-y-5 flex-1">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Kata Bahasa Korea (Hangeul) <span className="text-red-500">*</span></label>
                  <input 
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    placeholder="Contoh: 학교"
                    value={newData.korean}
                    onChange={(e) => setNewData({...newData, korean: e.target.value})}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Arti (Bahasa Indonesia) <span className="text-red-500">*</span></label>
                  <input 
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Contoh: Sekolah"
                    value={newData.meaning}
                    onChange={(e) => setNewData({...newData, meaning: e.target.value})}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Kategori</label>
                  <select 
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                    value={newData.category}
                    onChange={(e) => setNewData({...newData, category: e.target.value})}
                  >
                    <option value="">-- Pilih Kategori --</option>
                    <option value="Tempat">Tempat</option>
                    <option value="Kata Kerja">Kata Kerja</option>
                    <option value="Kata Sifat">Kata Sifat</option>
                    <option value="Benda">Benda</option>
                    <option value="Pekerjaan">Pekerjaan</option>
                    <option value="Waktu">Waktu</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 flex justify-between">
                    <span>Contoh Kalimat (Opsional)</span>
                  </label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                    rows={3}
                    placeholder="Tuliskan contoh kalimat penggunaan kata ini..."
                    value={newData.exampleSent}
                    onChange={(e) => setNewData({...newData, exampleSent: e.target.value})}
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3 rounded-b-2xl sticky bottom-0 z-10">
                <Button variant="outline" onClick={() => setIsAdding(false)}>Batal</Button>
                <Button onClick={handleSave} className="shadow-md shadow-primary/20">
                  {editingId ? 'Simpan Perubahan' : 'Simpan Kosakata'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
