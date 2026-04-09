'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatDateTime } from '@/lib/utils';

interface InvoiceRow {
  _id: string;
  orderId: string;
  total: number;
  status: string;
  createdAt: string;
  user?: {
    name?: string;
    email?: string;
  };
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch('/api/admin/orders?limit=50');
        const data = await res.json();
        setInvoices(data.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="page-enter">
      <div className="mb-6">
        <h1 className="font-heading text-3xl text-gray-900">Invoices</h1>
        <p className="text-gray-500 text-sm mt-1">Download, print, and resend customer invoices</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {['Invoice ID', 'Customer', 'Amount', 'Status', 'Date', 'Action'].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">
                    Loading invoices...
                  </td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">
                    No invoices found
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-brand-green font-bold">
                      <Link
                        href={`/admin/orders/${inv.orderId}`}
                        className="hover:underline"
                      >
                        {inv.orderId}
                      </Link>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{inv.user?.name || 'N/A'}</p>
                      <p className="text-xs text-gray-500">{inv.user?.email || ''}</p>
                    </td>

                    <td className="px-6 py-4 font-bold text-gray-900">
                      {formatCurrency(inv.total)}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700 capitalize">
                        {inv.status?.replace(/_/g, ' ')}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDateTime(inv.createdAt)}
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/orders/${inv.orderId}`}
                        className="text-sm font-medium text-brand-green hover:underline"
                      >
                        View Invoice
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