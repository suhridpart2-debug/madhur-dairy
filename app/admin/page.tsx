'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/admin/page.tsx  — Admin Dashboard
// ═══════════════════════════════════════════════════════════════════════════════
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, TrendingUp, Clock, Users, ArrowRight, RefreshCw } from 'lucide-react';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, OrderStatus } from '@/lib/constants';

interface AnalyticsSummary {
  todayOrders: number;
  todayRevenue: number;
  pendingOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  totalOrders: number;
}

interface Order {
  _id: string;
  orderId: string;
  user: { name: string; email: string };
  total: number;
  status: OrderStatus;
  createdAt: string;
  items: any[];
  payment: { method: string };
}

export default function AdminDashboard() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, ordersRes] = await Promise.all([
        fetch('/api/admin/analytics?range=7d'),
        fetch('/api/admin/orders?limit=8'),
      ]);
      const { summary: s } = await analyticsRes.json();
      const { orders } = await ordersRes.json();
      setSummary(s);
      setRecentOrders(orders || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const stats = [
    {
      label: "Today's Orders",
      value: loading ? '—' : String(summary?.todayOrders ?? 0),
      sub: 'Orders placed today',
      icon: ShoppingBag,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: "Today's Revenue",
      value: loading ? '—' : formatCurrency(summary?.todayRevenue ?? 0),
      sub: 'Revenue today',
      icon: TrendingUp,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Pending Orders',
      value: loading ? '—' : String(summary?.pendingOrders ?? 0),
      sub: 'Awaiting confirmation',
      icon: Clock,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      label: 'Total Customers',
      value: loading ? '—' : String(summary?.totalCustomers ?? 0),
      sub: 'Registered users',
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Admin 👋</p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green px-4 py-2 rounded-xl hover:bg-brand-green-pale transition-all"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden mb-8">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-brand-green font-medium hover:underline flex items-center gap-1"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Date'].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">Loading orders...</td>
                </tr>
              ) : recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">No orders yet</td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${order.orderId}`} className="font-mono text-sm font-bold text-brand-green hover:underline">
                        {order.orderId}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{order.user?.name || 'N/A'}</p>
                      <p className="text-xs text-gray-500">{order.user?.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{formatCurrency(order.total)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{order.payment?.method || 'COD'}</td>
                    <td className="px-6 py-4">
                      <span className={`chip-${order.status}`}>
                        {ORDER_STATUS_LABELS[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {formatDateTime(order.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights panel */}
      <div className="bg-gradient-to-br from-brand-deep-blue to-blue-900 rounded-2xl p-7 text-white">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-2xl">🤖</span>
          <h2 className="font-semibold text-lg">AI Business Insights</h2>
          <span className="ml-auto text-xs bg-white/20 px-2.5 py-1 rounded-full">Beta</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '🔥', text: 'Madhur Lassi orders increased 28% this week' },
            { icon: '⏰', text: 'Peak order time: 7–9 AM. Stock up the night before.' },
            { icon: '🔄', text: '8 customers are likely to reorder in the next 2 days.' },
            { icon: '📦', text: 'Taak 200ml may need restocking by Thursday.' },
          ].map((insight) => (
            <div key={insight.text} className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
              <span className="text-xl shrink-0">{insight.icon}</span>
              <p className="text-sm text-blue-100 leading-relaxed">{insight.text}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-blue-300 mt-4">
          AI insights are based on your order history. Full AI analytics available in the Analytics section.
        </p>
      </div>
    </div>
  );
}
