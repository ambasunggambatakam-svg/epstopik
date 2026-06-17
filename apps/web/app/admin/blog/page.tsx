"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { Search, Plus, Trash, FileText, Edit } from "lucide-react";
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

type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  category?: string;
  author?: string;
  metaTitle?: string;
  metaDescription?: string;
  keyword?: string;
  canonicalUrl?: string;
  createdAt: string;
};

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [newData, setNewData] = useState({
    title: "",
    slug: "",
    content: "",
    imageUrl: "",
    category: "",
    author: "",
    metaTitle: "",
    metaDescription: "",
    keyword: "",
    canonicalUrl: ""
  });

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await fetchApi('/admin/blog');
      setBlogs(data);
      setError(null);
    } catch (err: any) {
      setError("Gagal memuat artikel: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;
    try {
      await fetchApi(`/admin/blog/${id}`, { method: 'DELETE' });
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (err: any) {
      alert("Gagal menghapus: " + err.message);
    }
  };

  const handleSave = async () => {
    if (!newData.title || !newData.slug) {
      alert("Judul dan Slug wajib diisi!");
      return;
    }
    
    try {
      if (editingId) {
        const data = await fetchApi(`/admin/blog/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(newData)
        });
        setBlogs(blogs.map(b => b.id === editingId ? data : b));
      } else {
        const data = await fetchApi('/admin/blog', {
          method: 'POST',
          body: JSON.stringify(newData)
        });
        setBlogs([data, ...blogs]);
      }
      setIsAdding(false);
      setEditingId(null);
      setIsPreview(false);
      setNewData({ title: "", slug: "", content: "", imageUrl: "", category: "", author: "", metaTitle: "", metaDescription: "", keyword: "", canonicalUrl: "" });
    } catch (err: any) {
      alert("Gagal menyimpan: " + err.message);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setNewData({ title: "", slug: "", content: "", imageUrl: "", category: "", author: "Admin EPSTOPIK", metaTitle: "", metaDescription: "", keyword: "", canonicalUrl: "" });
    setIsAdding(true);
  };

  const openEditModal = (b: Blog) => {
    setEditingId(b.id);
    setNewData({
      title: b.title,
      slug: b.slug,
      content: b.content,
      imageUrl: b.imageUrl || "",
      category: b.category || "",
      author: b.author || "",
      metaTitle: b.metaTitle || "",
      metaDescription: b.metaDescription || "",
      keyword: b.keyword || "",
      canonicalUrl: b.canonicalUrl || ""
    });
    setIsAdding(true);
  };

  const generateSlug = (title: string) => {
    const slug = title.toLowerCase().replace(new RegExp("[^a-z0-9]+", "g"), '-').replace(new RegExp("(^-|-$)+", "g"), '');
    setNewData({ ...newData, title, slug });
  };

  return (
    <>
      <div className="space-y-6 animate-fade-in relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-gray-900">Manajemen Blog / Artikel</h1>
            <p className="text-gray-500 mt-1">Kelola publikasi artikel dan informasi terbaru.</p>
          </div>
          <Button onClick={openAddModal}>
            <Plus className="w-4 h-4 mr-2" />
            Tulis Artikel Baru
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {!isAdding && (
          <div className="bg-white rounded-2xl border shadow-sm">
            <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50 rounded-t-2xl">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Cari judul artikel..."
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
                    <th className="px-6 py-4">Judul Artikel</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4">Penulis</th>
                    <th className="px-6 py-4">Tanggal</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {blogs.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          {b.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{"/" + b.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600">{b.category || '-'}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{b.author || '-'}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(b.createdAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="h-8 px-2 text-gray-600 hover:text-blue-600" onClick={() => openEditModal(b)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 px-2 text-gray-600 hover:text-red-600" onClick={() => handleDelete(b.id)}>
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {blogs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        Belum ada artikel yang diterbitkan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          </div>
        )}
      </div>


      {isAdding && (
        <div className="mt-6 animate-fade-in">
          <div className="bg-white rounded-2xl w-full flex flex-col shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50/50 sticky top-0 z-10">
                <h2 className="text-xl font-bold font-heading text-gray-900">
                  {editingId ? 'Edit Artikel' : 'Tulis Artikel Baru'}
                </h2>
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsPreview(!isPreview)} className="text-sm font-medium text-primary hover:underline">
                    {isPreview ? 'Kembali ke Editor' : 'Pratinjau'}
                  </button>
                  <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                {isPreview ? (
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 prose prose-lg prose-blue max-w-none shadow-inner min-h-[500px]">
                    <div className="mb-8 border-b pb-4">
                      <h1 className="text-3xl font-bold font-heading text-gray-900 mb-2">{newData.title || 'Judul Artikel'}</h1>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">{newData.category || 'Kategori'}</span>
                        <span>Oleh: {newData.author || 'Penulis'}</span>
                      </div>
                      {newData.imageUrl && (
                        <div className="mb-6 rounded-xl overflow-hidden shadow-sm border">
                          <img src={newData.imageUrl} alt="Sampul" className="w-full h-auto object-cover max-h-64" />
                        </div>
                      )}
                    </div>
                    <div 
                      className="prose prose-blue max-w-none prose-img:rounded-xl"
                      dangerouslySetInnerHTML={{ __html: newData.content || '<p>Belum ada konten.</p>' }}
                    />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm font-semibold text-gray-700">Judul Artikel <span className="text-red-500">*</span></label>
                        <input 
                          className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="Masukkan judul menarik..."
                          value={newData.title}
                          onChange={(e) => generateSlug(e.target.value)}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">URL Slug <span className="text-red-500">*</span></label>
                        <input 
                          className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50"
                          placeholder="contoh-judul-artikel"
                          value={newData.slug}
                          onChange={(e) => setNewData({...newData, slug: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm font-semibold text-gray-700 flex justify-between">
                          <span>URL Sampul Artikel (Cover Image)</span>
                        </label>
                        <input 
                          className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="Contoh: https://example.com/image.jpg"
                          value={newData.imageUrl}
                          onChange={(e) => setNewData({...newData, imageUrl: e.target.value})}
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm font-semibold text-gray-700 flex justify-between">
                          <span>Canonical Link / Gambar</span>
                        </label>
                        <input 
                          className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="https://..."
                          value={newData.canonicalUrl}
                          onChange={(e) => setNewData({...newData, canonicalUrl: e.target.value})}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Meta Title</label>
                        <input 
                          className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="Meta Title"
                          value={newData.metaTitle}
                          onChange={(e) => setNewData({...newData, metaTitle: e.target.value})}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Meta Deskripsi</label>
                        <input 
                          className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="Meta Deskripsi"
                          value={newData.metaDescription}
                          onChange={(e) => setNewData({...newData, metaDescription: e.target.value})}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Keyword</label>
                        <input 
                          className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="Keyword, dipisah koma"
                          value={newData.keyword}
                          onChange={(e) => setNewData({...newData, keyword: e.target.value})}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Kategori</label>
                        <input 
                          className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="Contoh: Tips & Trik"
                          value={newData.category}
                          onChange={(e) => setNewData({...newData, category: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 pb-12">
                      <label className="text-sm font-semibold text-gray-700 flex justify-between">
                        <span>Konten Artikel <span className="text-red-500">*</span></span>
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
                  </>
                )}
              </div>

              <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3 rounded-b-2xl sticky bottom-0 z-10">
                <Button variant="outline" onClick={() => setIsAdding(false)}>Batal</Button>
                <Button onClick={handleSave} className="shadow-md shadow-primary/20">
                  {editingId ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
                </Button>
              </div>
            </div>
          </div>
      )}
    </>
  );
}
