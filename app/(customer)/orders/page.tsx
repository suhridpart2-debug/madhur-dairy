// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/(customer)/orders/page.tsx  — My Orders (authenticated)
// ═══════════════════════════════════════════════════════════════════════════════
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getOrdersByUser } from '@/services/orderService';
import Link from 'next/link';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, OrderStatus } from '@/lib/constants';
import { Package, ArrowRight } from 'lucide-react';

export default async function MyOrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/signin');

  const orders = await getOrdersByUser(session.user.id).catch(() => []);

  return (
    <div className="page-enter pt-24 pb-20">
      <div className="section-container max-w-3xl">
        <h1 className="font-heading text-3xl text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-card">
            <Package size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 text-sm mb-6">Your orders will appear here once you place one.</p>
            <Link href="/products" className="btn-primary inline-flex">Shop Now</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <Link
                key={order._id}
                href={`/orders/${order.orderId}`}
                className="block bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-mono-brand text-sm font-bold text-gray-900">{order.orderId}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`chip-${order.status}`}>
                      {ORDER_STATUS_LABELS[order.status as OrderStatus]}
                    </span>
                    <ArrowRight size={16} className="text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''} · {order.payment.method === 'cod' ? 'Cash on Delivery' : 'Online'}
                  </p>
                  <p className="font-bold text-gray-900">{formatCurrency(order.total)}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {order.items.slice(0, 3).map((item: any, i: number) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      {item.name} ×{item.quantity}
                    </span>
                  ))}
                  {order.items.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                      +{order.items.length - 3} more
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
