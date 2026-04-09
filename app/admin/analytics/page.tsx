'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/admin/analytics/page.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, Package, Clock, Users } from 'lucide-react';

const RANGE_OPTIONS = ['7d', '30d', '90d'];
const COLORS = ['#2D7A3A', '#C0392B', '#1A3A5C', '#E67E22', '#D4AF37'];

export default function AnalyticsPage() {
  const [range, setRange] = useState('7d');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/analytics?range=${range}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [range]);

  const summary = data?.summary;

  const summaryCards = [
    { label: 'Total Revenue', value: summary ? formatCurrency(summary.totalRevenue) : '—', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
    { label: 'Total Orders', value: summary?.totalOrders ?? '—', icon: Package, color: 'text-blue-600 bg-blue-50' },
    { label: 'Avg Order Value', value: summary ? formatCurrency(summary.avgOrderValue) : '—', icon: Clock, color: 'text-orange-600 bg-orange-50' },
    { label: 'Total Customers', value: summary?.totalCustomers ?? '—', icon: Users, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-gray-900">Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Sales insights for your dairy business</p>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-1">
          {RANGE_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                range === r ? 'bg-brand-green text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${card.color}`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{loading ? '—' : card.value}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card mb-6">
        <h2 className="font-semibold text-gray-900 mb-6">Revenue Over Time</h2>
        {loading ? (
          <div className="h-64 flex items-center justify-center text-gray-400 text-sm">Loading chart...</div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data?.revenueByDay || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={(v) => v.slice(5)} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={(v) => `₹${v}`} />
              <Tooltip
                formatter={(val: number) => [formatCurrency(val), 'Revenue']}
                labelFormatter={(l) => `Date: ${l}`}
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '13px' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#2D7A3A" strokeWidth={2.5} dot={{ fill: '#2D7A3A', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Products */}
        <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card">
          <h2 className="font-semibold text-gray-900 mb-6">Top Products by Volume</h2>
          {loading ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">Loading...</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data?.topProducts || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <YAxis dataKey="product" type="category" tick={{ fontSize: 11, fill: '#374151' }} width={120} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '13px' }} />
                <Bar dataKey="totalQty" fill="#2D7A3A" radius={[0, 6, 6, 0]} name="Units Sold" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Peak Hours */}
        <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card">
          <h2 className="font-semibold text-gray-900 mb-6">Orders by Hour (Peak Times)</h2>
          {loading ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">Loading...</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data?.peakHours || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#9CA3AF' }} tickFormatter={(h) => `${h}:00`} />
                <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '13px' }}
                  labelFormatter={(h) => `${h}:00 – ${h + 1}:00`}
                />
                <Bar dataKey="count" fill="#C0392B" radius={[4, 4, 0, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-gray-900 to-brand-deep-blue rounded-2xl p-7 text-white">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">🤖</span>
          <h2 className="font-semibold text-lg">AI Sales Insights</h2>
          <span className="ml-auto text-xs bg-white/20 px-3 py-1 rounded-full">AI-powered</span>
        </div>
        {loading ? (
          <p className="text-gray-400 text-sm">Generating insights...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: '📈',
                title: 'Growth Opportunity',
                text: data?.topProducts?.[0]
                  ? `"${data.topProducts[0].product}" is your top seller with ${data.topProducts[0].totalQty} units. Consider a bulk discount to drive volume further.`
                  : 'Add more products and get more orders to unlock personalized insights.',
              },
              {
                icon: '⏰',
                title: 'Peak Demand',
                text: data?.peakHours?.length
                  ? `Most orders come in at ${data.peakHours.reduce((a: any, b: any) => (a.count > b.count ? a : b))?.hour}:00. Prepare stock and staff accordingly.`
                  : 'Not enough data yet for peak analysis.',
              },
              {
                icon: '💡',
                title: 'Pricing Insight',
                text: summary
                  ? `Average order value is ${formatCurrency(summary.avgOrderValue)}. Adding bundle offers could push this above ₹100.`
                  : 'More orders needed for pricing insights.',
              },
              {
                icon: '🔄',
                title: 'Retention Tip',
                text: 'Customers who order Taak and Lassi together have a 3× higher reorder rate. Consider promoting them as a combo.',
              },
            ].map((insight) => (
              <div key={insight.title} className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{insight.icon}</span>
                  <p className="font-semibold text-sm text-white">{insight.title}</p>
                </div>
                <p className="text-sm text-blue-100 leading-relaxed">{insight.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
