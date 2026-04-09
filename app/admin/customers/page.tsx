'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/admin/customers/page.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Users } from 'lucide-react';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/customers')
      .then((r) => r.json())
      .then((d) => setCustomers(d.customers || []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = customers.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q);
  });

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-3xl text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">{customers.length} registered users</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card mb-6">
        <input
          type="text"
          placeholder="Search customers by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field text-sm"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Customer', 'Total Orders', 'Total Spent', 'Last Order', 'Joined'].map((h) => (
                  <th key={h} className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="py-16 text-center text-gray-400 text-sm">Loading customers...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-16 text-center text-gray-400 text-sm">No customers found</td></tr>
              ) : filtered.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {c.image ? (
                        <Image src={c.image} alt={c.name} width={36} height={36} className="rounded-full" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-brand-green-pale flex items-center justify-center">
                          <Users size={16} className="text-brand-green" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{c.name}</p>
                        <p className="text-xs text-gray-500">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">{c.totalOrders}</span>
                    <span className="text-gray-500 text-sm"> orders</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-brand-green">{formatCurrency(c.totalSpent)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.lastOrderAt ? formatDate(c.lastOrderAt) : '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
