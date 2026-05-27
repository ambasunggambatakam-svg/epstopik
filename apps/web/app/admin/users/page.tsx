"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { Search, Filter, Shield, ShieldAlert, BadgeCheck, Trash } from "lucide-react";
import { fetchApi } from "../../../lib/api";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  createdAt: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchApi('/admin/users');
      setUsers(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Gagal memuat pengguna. Pastikan Anda sudah login sebagai Admin.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      await fetchApi(`/admin/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ role: newRole })
      });
      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    } catch (err: any) {
      alert("Gagal mengubah role: " + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus user ini secara permanen?")) return;
    try {
      await fetchApi(`/admin/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter(u => u.id !== id));
    } catch (err: any) {
      alert("Gagal menghapus user: " + err.message);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-1">Kelola daftar pengguna, atur role, dan status premium secara manual.</p>
        </div>
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
              placeholder="Cari email atau nama..."
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
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Tanggal Daftar</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{user.name || 'No Name'}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.role === 'ADMIN' && <ShieldAlert className="w-4 h-4 text-purple-600" />}
                        {user.role === 'PREMIUM' && <BadgeCheck className="w-4 h-4 text-primary" />}
                        {user.role === 'FREE' && <Shield className="w-4 h-4 text-gray-400" />}
                        
                        <select 
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className={`font-semibold bg-transparent border-b border-dashed focus:outline-none cursor-pointer ${
                            user.role === 'ADMIN' ? 'text-purple-700 border-purple-300' :
                            user.role === 'PREMIUM' ? 'text-primary border-primary/30' :
                            'text-gray-600 border-gray-300'
                          }`}
                        >
                          <option value="FREE">FREE</option>
                          <option value="PREMIUM">PREMIUM</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" className="h-8 px-2 text-gray-600 hover:text-red-600" onClick={() => handleDelete(user.id)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
