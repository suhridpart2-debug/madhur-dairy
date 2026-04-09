'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/(customer)/cart/page.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!items.length) {
    return (
      <div className="pt-24 pb-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center rounded-3xl border border-gray-100 bg-white shadow-sm p-10">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-green-50 flex items-center justify-center">
              <ShoppingBag className="text-brand-green" size={34} />
            </div>

            <h1 className="font-heading text-4xl text-gray-900 mb-3">Your cart is empty</h1>
            <p className="text-gray-500 mb-6">
              Add some fresh Madhur products to your cart.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-2xl bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green-light transition-all shadow-md hover:shadow-lg"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        <div className="mb-8">
          <h1 className="font-heading text-4xl md:text-5xl text-gray-900 mb-2">Your Cart</h1>
          <p className="text-gray-500">Review your selected products before checkout.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left side */}
          <div className="lg:col-span-2 space-y-5">
            {items.map((item) => (
              <div
                key={item.productId}
                className="rounded-3xl border border-gray-100 bg-white shadow-sm p-5 flex flex-col sm:flex-row gap-5"
              >
                <div className="w-full sm:w-36 h-36 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-brand-green-pale flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                      🥛
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col">
                  <h2 className="text-2xl font-heading text-gray-900 mb-1">{item.name}</h2>
                  <p className="text-sm text-gray-500 mb-3">{item.volume}</p>

                  <div className="text-2xl font-bold text-gray-900 mb-4">₹{item.price}</div>

                  <div className="flex flex-wrap items-center gap-4 mt-auto">
                    <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                        }
                        className="px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="px-5 py-3 font-semibold">{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-red-200 px-4 py-3 text-red-600 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-6 sticky top-28">
            <h2 className="text-2xl font-heading text-gray-900 mb-5">Order Summary</h2>

            <div className="space-y-4 mb-5">
              <div className="flex items-center justify-between text-gray-600">
                <span>Items Total</span>
                <span>₹{total}</span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <span>Delivery</span>
                <span className="text-brand-green font-medium">Free</span>
              </div>

              <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/checkout"
                className="w-full inline-flex items-center justify-center rounded-2xl bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green-light transition-all shadow-md hover:shadow-lg"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="w-full inline-flex items-center justify-center rounded-2xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 hover:border-brand-green hover:text-brand-green transition-all"
              >
                Continue Shopping
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="w-full inline-flex items-center justify-center rounded-2xl border border-red-200 px-6 py-3 font-semibold text-red-600 hover:bg-red-50 transition-all"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}