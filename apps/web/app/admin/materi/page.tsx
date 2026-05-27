"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { Search, Plus, Trash, BookOpen, Star, Edit, Link as LinkIcon, FileText, Type } from "lucide-react";
import { fetchApi } from "../../../lib/api";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center bg-gray-50 border rounded-xl animate-pulse">Memuat Editor...</div>
});

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

type Materi = {
  id: string;
  title: string;
  content: string;
  category: string;
  fileUrl: string | null;
  isPremium: boolean;
  createdAt: string;
};

export default function AdminMateriPage() {
  const [materis, setMateris] = useState<Materi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [materiType, setMateriType] = useState<'link' | 'file' | 'manual'>('manual');
  const [newData, setNewData] = useState({
    title: "",
    content: "",
    category: "",
    fileUrl: "",
    isPremium: false
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchApi('/admin/materi');
      setMateris(data);
      setError(null);
    } catch (err: any) {
      setError("Gagal memuat materi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus materi ini?")) return;
    try {
      await fetchApi(`/admin/materi/${id}`, { method: 'DELETE' });
      setMateris(materis.filter(m => m.id !== id));
    } catch (err: any) {
      alert("Gagal menghapus: " + err.message);
    }
  };

  const handleSave = async () => {
    if (!newData.title || !newData.content) {
      alert("Judul dan Konten wajib diisi!");
      return;
    }
    
    try {
      if (editingId) {
        const data = await fetchApi(`/admin/materi/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(newData)
        });
        setMateris(materis.map(m => m.id === editingId ? data : m));
      } else {
        const data = await fetchApi('/admin/materi', {
          method: 'POST',
          body: JSON.stringify(newData)
        });
        setMateris([data, ...materis]);
      }
      setIsAdding(false);
      setEditingId(null);
      setNewData({ title: "", content: "", category: "", fileUrl: "", isPremium: false });
    } catch (err: any) {
      alert("Gagal menyimpan: " + err.message);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setMateriType('manual');
    setNewData({ title: "", content: "", category: "", fileUrl: "", isPremium: false });
    setIsAdding(true);
  };

  const openEditModal = (m: Materi) => {
    setEditingId(m.id);
    if (m.fileUrl) {
      setMateriType('link');
    } else {
      setMateriType('manual');
    }
    setNewData({
      title: m.title,
      content: m.content,
      category: m.category || "",
      fileUrl: m.fileUrl || "",
      isPremium: m.isPremium
    });
    setIsAdding(true);
  };

  return (
    <>
      <div className="space-y-6 animate-fade-in relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-gray-900">Manajemen Materi Belajar</h1>
            <p className="text-gray-500 mt-1">Kelola modul pembelajaran tata bahasa dan topik EPS-TOPIK.</p>
          </div>
          <Button onClick={openAddModal}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Materi Baru
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
                placeholder="Cari materi..."
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
                    <th className="px-6 py-4">Judul Materi</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4">Tipe Akses</th>
                    <th className="px-6 py-4">Konten</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {materis.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-primary" />
                          {m.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {m.category || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2 text-xs">
                          {m.isPremium ? (
                            <span className="inline-flex w-max items-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-800 rounded-md font-bold">
                              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /> Premium
                            </span>
                          ) : (
                            <span className="inline-flex w-max items-center px-2.5 py-1 bg-green-100 text-green-800 rounded-md font-bold">
                              Gratis
                            </span>
                          )}
                          {m.fileUrl && (
                            <a href={m.fileUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline truncate max-w-[120px]">
                              Lampiran Link
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 max-w-xs truncate" title={m.content}>
                        {m.content}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="h-8 px-2 text-gray-600 hover:text-blue-600" onClick={() => openEditModal(m)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 px-2 text-gray-600 hover:text-red-600" onClick={() => handleDelete(m.id)}>
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {materis.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        Belum ada materi pembelajaran.
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
            <div className="bg-white rounded-2xl w-full max-w-4xl flex flex-col shadow-2xl border overflow-hidden">
              <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50/50 sticky top-0 z-10">
                <h2 className="text-xl font-bold font-heading text-gray-900">
                  {editingId ? 'Edit Materi' : 'Tambah Materi Baru'}
                </h2>
                <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div className="p-6 space-y-5 flex-1 overflow-y-auto">
                <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100 rounded-xl w-fit mb-6">
                  <button 
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${materiType === 'manual' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setMateriType('manual')}
                  >
                    <Type className="w-4 h-4" /> Tulis Manual
                  </button>
                  <button 
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${materiType === 'link' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setMateriType('link')}
                  >
                    <LinkIcon className="w-4 h-4" /> Link Tujuan
                  </button>
                  <button 
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${materiType === 'file' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setMateriType('file')}
                  >
                    <FileText className="w-4 h-4" /> File / Dokumen
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">Judul Materi <span className="text-red-500">*</span></label>
                    <input 
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                      placeholder="Contoh: Tata Bahasa Dasar Part 1"
                      value={newData.title}
                      onChange={(e) => setNewData({...newData, title: e.target.value})}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Kategori</label>
                    <input 
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Contoh: Grammar, Reading, dsb"
                      value={newData.category}
                      onChange={(e) => setNewData({...newData, category: e.target.value})}
                    />
                  </div>

                  <div className="space-y-1.5 flex items-center pt-7">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          checked={newData.isPremium}
                          onChange={(e) => setNewData({...newData, isPremium: e.target.checked})}
                        />
                        <div className={`block w-14 h-8 rounded-full transition-colors ${newData.isPremium ? 'bg-primary' : 'bg-gray-300'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${newData.isPremium ? 'transform translate-x-6' : ''}`}></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">Materi Premium</span>
                        <span className="text-xs text-gray-500">Hanya untuk member berbayar</span>
                      </div>
                    </label>
                  </div>

                  {materiType !== 'manual' && (
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        {materiType === 'link' ? <LinkIcon className="w-4 h-4 text-blue-500" /> : <FileText className="w-4 h-4 text-orange-500" />}
                        {materiType === 'link' ? 'URL / Link Tujuan' : 'Link Google Drive / Dokumen'} <span className="text-red-500">*</span>
                      </label>
                      <input 
                        className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50"
                        placeholder={materiType === 'link' ? 'https://youtube.com/...' : 'https://drive.google.com/file/...'}
                        value={newData.fileUrl}
                        onChange={(e) => setNewData({...newData, fileUrl: e.target.value})}
                      />
                    </div>
                  )}
                </div>

                {materiType === 'manual' ? (
                  <div className="space-y-1.5 pb-12">
                    <label className="text-sm font-semibold text-gray-700 flex justify-between">
                      <span>Konten Materi Manual <span className="text-red-500">*</span></span>
                    </label>
                    <div className="bg-white rounded-xl overflow-hidden border border-gray-300">
                      <ReactQuill 
                        theme="snow"
                        value={newData.content}
                        onChange={(val) => setNewData({...newData, content: val})}
                        modules={quillModules}
                        className="h-64 sm:h-96"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 flex justify-between">
                      <span>Deskripsi Singkat <span className="text-red-500">*</span></span>
                    </label>
                    <textarea 
                      className="w-full p-4 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                      rows={4}
                      placeholder="Tuliskan deskripsi singkat mengenai isi link / file di atas..."
                      value={newData.content}
                      onChange={(e) => setNewData({...newData, content: e.target.value})}
                    />
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3 rounded-b-2xl sticky bottom-0 z-10">
                <Button variant="outline" onClick={() => setIsAdding(false)}>Batal</Button>
                <Button onClick={handleSave} className="shadow-md shadow-primary/20">
                  {editingId ? 'Simpan Perubahan' : 'Simpan Materi'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
