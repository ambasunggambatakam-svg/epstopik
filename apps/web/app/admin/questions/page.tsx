"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { Search, Plus, Trash, BookOpen, Headphones } from "lucide-react";
import { fetchApi } from "../../../lib/api";

type Question = {
  id: string;
  type: string;
  content: string;
  options: string[];
  correctAnswer: number;
  explanation: string | null;
};

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add Question Modal State
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    type: "READING",
    content: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: ""
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await fetchApi('/admin/questions');
      setQuestions(data);
      setError(null);
    } catch (err: any) {
      setError(err.message === 'Forbidden: Admins only' || err.message === 'Unauthorized' || err.message.includes('No Authorization')
        ? "Anda belum memiliki akses Admin. Silakan kembali ke menu Dashboard dan klik tombol '[Dev] Force Login Admin'." 
        : "Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus soal ini?")) return;
    try {
      await fetchApi(`/admin/questions/${id}`, { method: 'DELETE' });
      setQuestions(questions.filter(q => q.id !== id));
    } catch (err: any) {
      alert("Gagal menghapus: " + err.message);
    }
  };

  const handleSaveNew = async () => {
    try {
      const data = await fetchApi('/admin/questions', {
        method: 'POST',
        body: JSON.stringify(newQuestion)
      });
      setQuestions([data, ...questions]);
      setIsAdding(false);
      setNewQuestion({ type: "READING", content: "", options: ["", "", "", ""], correctAnswer: 0, explanation: "" });
    } catch (err: any) {
      alert("Gagal menambah: " + err.message);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-fade-in relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-gray-900">Manajemen Bank Soal</h1>
            <p className="text-gray-500 mt-1">Tambah, edit, dan kelola soal Reading maupun Listening.</p>
          </div>
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Soal Baru
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
                placeholder="Cari konten soal..."
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
                    <th className="px-6 py-4">ID Soal</th>
                    <th className="px-6 py-4">Tipe</th>
                    <th className="px-6 py-4">Konten Soal</th>
                    <th className="px-6 py-4">Jawaban Benar</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {questions.map((q) => (
                    <tr key={q.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{q.id.substring(0,8)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 font-medium text-gray-900">
                          {q.type === 'READING' ? <BookOpen className="w-4 h-4 text-blue-500" /> : <Headphones className="w-4 h-4 text-orange-500" />}
                          {q.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 max-w-xs truncate" title={q.content}>
                        {q.content}
                      </td>
                      <td className="px-6 py-4 font-semibold text-green-600">
                        {q.options[q.correctAnswer]}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="h-8 px-2 text-gray-600 hover:text-red-600" onClick={() => handleDelete(q.id)}>
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
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
            <div className="bg-white rounded-2xl w-full max-w-3xl flex flex-col shadow-2xl border overflow-hidden">
              <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50/50 sticky top-0 z-10">
                <h2 className="text-xl font-bold font-heading text-gray-900">Buat Soal Baru</h2>
                <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div className="p-6 space-y-6 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Tipe Soal <span className="text-red-500">*</span></label>
                    <select 
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50/50 cursor-pointer"
                      value={newQuestion.type}
                      onChange={(e) => setNewQuestion({...newQuestion, type: e.target.value})}
                    >
                      <option value="READING">Reading (Membaca)</option>
                      <option value="LISTENING">Listening (Mendengar)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Konten Pertanyaan <span className="text-red-500">*</span></label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400" 
                    rows={3}
                    placeholder="Tuliskan pertanyaan di sini..."
                    value={newQuestion.content}
                    onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center justify-between">
                    <span>Pilihan Jawaban <span className="text-red-500">*</span></span>
                    <span className="text-xs font-normal text-gray-500 hidden sm:inline">Pilih salah satu radio button sebagai jawaban benar</span>
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {newQuestion.options.map((opt, i) => (
                      <label key={i} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${newQuestion.correctAnswer === i ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                        <input 
                          type="radio" name="correctAnswer" 
                          checked={newQuestion.correctAnswer === i} 
                          onChange={() => setNewQuestion({...newQuestion, correctAnswer: i})}
                          className="w-5 h-5 text-primary focus:ring-primary/20 cursor-pointer"
                        />
                        <input 
                          className="w-full bg-transparent text-sm focus:outline-none placeholder:text-gray-400" 
                          placeholder={`Masukkan opsi jawaban ${i+1}`}
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...newQuestion.options];
                            newOpts[i] = e.target.value;
                            setNewQuestion({...newQuestion, options: newOpts});
                          }}
                        />
                        {newQuestion.correctAnswer === i && <span className="text-xs font-bold text-primary whitespace-nowrap bg-white px-2 py-1 rounded-md border border-primary/20 shadow-sm">Jawaban Benar</span>}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Pembahasan (Opsional)</label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 bg-gray-50/50" 
                    rows={3}
                    placeholder="Tulis penjelasan mengapa jawaban tersebut benar..."
                    value={newQuestion.explanation || ''}
                    onChange={(e) => setNewQuestion({...newQuestion, explanation: e.target.value})}
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3 rounded-b-2xl sticky bottom-0 z-10">
                <Button variant="outline" onClick={() => setIsAdding(false)}>Batal</Button>
                <Button onClick={handleSaveNew} className="shadow-md shadow-primary/20">Simpan Pertanyaan</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
