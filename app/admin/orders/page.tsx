'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/admin/orders/page.tsx  — Admin Orders Management
// ═══════════════════════════════════════════════════════════════════════════════
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, Filter, Eye } from 'lucide-react';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { ORDER_STATUS_LABELS, OrderStatus } from '@/lib/constants';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['all', 'placed', 'confirmed', 'out_for_delivery', 'delivered', 'cancelled'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      const res = await fetch(`/api/admin/orders?${params}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
      );
      toast.success('Order status updated');
    } catch {
      toast.error('Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      o.orderId.toLowerCase().includes(q) ||
      o.user?.name?.toLowerCase().includes(q) ||
      o.user?.email?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-3xl text-gray-900">Orders</h1>
        <button onClick={fetchOrders} className="text-sm text-brand-green hover:underline">Refresh</button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card mb-6 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID, customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 py-2.5 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field py-2.5 text-sm w-auto"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === 'all' ? 'All Statuses' : ORDER_STATUS_LABELS[s as OrderStatus]}
              </option>
            ))}
          </select>
        </div>
        <span className="text-xs text-gray-500">{filteredOrders.length} orders</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Update Status', 'Date', 'Action'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={9} className="py-16 text-center text-gray-400 text-sm">Loading orders...</td></tr>
              ) : filteredOrders.length === 0 ? (
                <tr><td colSpan={9} className="py-16 text-center text-gray-400 text-sm">No orders found</td></tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm font-bold text-brand-green">{order.orderId}</span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-900">{order.user?.name}</p>
                      <p className="text-xs text-gray-500">{order.user?.email}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{order.items.length}</td>
                    <td className="px-5 py-4 text-sm font-bold text-gray-900">{formatCurrency(order.total)}</td>
                    <td className="px-5 py-4 text-sm text-gray-600 uppercase">{order.payment?.method}</td>
                    <td className="px-5 py-4">
                      <span className={`chip-${order.status}`}>
                        {ORDER_STATUS_LABELS[order.status as OrderStatus]}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={order.status}
                        disabled={updatingId === order.orderId}
                        onChange={(e) => updateStatus(order.orderId, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:ring-1 focus:ring-brand-green focus:border-brand-green outline-none disabled:opacity-50"
                      >
                        {STATUS_OPTIONS.filter((s) => s !== 'all').map((s) => (
                          <option key={s} value={s}>{ORDER_STATUS_LABELS[s as OrderStatus]}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">{formatDateTime(order.createdAt)}</td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/orders/${order.orderId}`}
                        className="p-2 rounded-lg hover:bg-brand-green-pale text-gray-500 hover:text-brand-green transition-colors inline-flex"
                      >
                        <Eye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
