'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/cart/CartDrawer.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, total } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand-green-pale rounded-xl flex items-center justify-center">
                  <ShoppingBag size={18} className="text-brand-green" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Your Cart</h2>
                  <p className="text-xs text-gray-500">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <span className="text-6xl mb-4">🛒</span>
                  <h3 className="font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-sm text-gray-500 mb-6">Add some fresh products to get started</p>
                  <button
                    onClick={closeCart}
                    className="btn-primary text-sm"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4 py-4 border-b border-gray-50">
                      {/* Product image */}
                      <div className="w-16 h-16 rounded-xl bg-brand-green-pale flex items-center justify-center shrink-0 overflow-hidden">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover" />
                        ) : (
                          <span className="text-2xl">🥛</span>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">{item.volume}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Price + remove */}
                      <div className="text-right shrink-0">
                        <p className="font-bold text-gray-900 text-sm mb-2">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-600 text-sm">Subtotal</span>
                  <span className="font-bold text-gray-900">{formatCurrency(total())}</span>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-gray-600 text-sm">Delivery</span>
                  <span className="text-brand-green font-semibold text-sm">FREE ✓</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-primary w-full text-center block text-base"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-3 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
