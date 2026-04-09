// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/(customer)/orders/[orderId]/page.tsx  — Order tracking
// ═══════════════════════════════════════════════════════════════════════════════
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getOrderById } from '@/services/orderService';
import { notFound } from 'next/navigation';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils';
import { ORDER_STATUS_LABELS, OrderStatus } from '@/lib/constants';
import { CheckCircle, Circle, Package, Truck, Home, XCircle } from 'lucide-react';
import Link from 'next/link';

const STATUS_STEPS = [
  { key: 'placed', label: 'Order Placed', icon: Package },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Home },
];

export default async function OrderTrackingPage({
  params,
}: {
  params: { orderId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/signin');

  const order = await getOrderById(params.orderId).catch(() => null);
  if (!order) notFound();

  // Access control: user can only see their own orders
  if (session.user.role !== 'admin' && (order.user as any)?._id?.toString() !== session.user.id) {
    redirect('/orders');
  }

  const isCancelled = order.status === 'cancelled';
  const currentStepIndex = STATUS_STEPS.findIndex((s) => s.key === order.status);

  return (
    <div className="page-enter pt-24 pb-20">
      <div className="section-container max-w-2xl">
        <Link href="/orders" className="text-sm text-gray-500 hover:text-brand-green mb-6 inline-flex items-center gap-1 transition-colors">
          ← Back to My Orders
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card mb-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Order ID</p>
              <p className="font-mono-brand text-xl font-bold text-gray-900">{order.orderId}</p>
              <p className="text-sm text-gray-500 mt-1">Placed on {formatDateTime(order.createdAt)}</p>
            </div>
            <span className={`chip-${order.status} text-sm px-4 py-1.5`}>
              {ORDER_STATUS_LABELS[order.status as OrderStatus]}
            </span>
          </div>

          {/* Timeline */}
          {!isCancelled ? (
            <div className="flex items-center justify-between mt-6 px-2">
              {STATUS_STEPS.map((s, i) => {
                const Icon = s.icon;
                const isDone = i <= currentStepIndex;
                const isActive = i === currentStepIndex;
                return (
                  <div key={s.key} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isDone ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-400'
                        } ${isActive ? 'shadow-green-glow ring-4 ring-green-100' : ''}`}
                      >
                        <Icon size={18} />
                      </div>
                      <p className={`text-xs mt-2 text-center font-medium ${isDone ? 'text-brand-green' : 'text-gray-400'}`}>
                        {s.label}
                      </p>
                    </div>
                    {i < STATUS_STEPS.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 mb-4 ${i < currentStepIndex ? 'bg-brand-green' : 'bg-gray-200'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-3 mt-4 p-4 bg-red-50 rounded-xl">
              <XCircle size={20} className="text-red-500" />
              <p className="text-sm text-red-700 font-medium">This order has been cancelled.</p>
            </div>
          )}
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card mb-5">
          <h3 className="font-semibold text-gray-900 mb-5">Items Ordered</h3>
          <div className="space-y-4">
            {order.items.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-green-pale flex items-center justify-center text-xl shrink-0">🥛</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.volume} × {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900 text-sm">{formatCurrency(item.subtotal)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 mt-5 pt-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-600">Delivery</span><span className="text-brand-green font-medium">FREE</span></div>
            <div className="flex justify-between font-bold"><span>Total</span><span className="text-brand-green">{formatCurrency(order.total)}</span></div>
          </div>
        </div>

        {/* Address + Slot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Delivery Address</p>
            <p className="font-semibold text-gray-900 text-sm">{order.address.fullName}</p>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              {order.address.street}<br />
              {order.address.city}, {order.address.state} {order.address.pincode}<br />
              📞 {order.address.phone}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Delivery Slot</p>
            <p className="font-semibold text-gray-900 text-sm">{formatDate(order.deliverySlot.date)}</p>
            <p className="text-sm text-gray-600 mt-1">⏰ {order.deliverySlot.timeSlot}</p>
            <p className="text-sm text-gray-600 mt-2">💵 Cash on Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
}
