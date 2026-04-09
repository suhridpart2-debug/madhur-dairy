'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/product/ProductDetailClient.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface ProductType {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription?: string;
  image: string;
  volume: string;
  price: number;
  category: string;
  featured?: boolean;
  stock?: number;
  status?: string;
}

interface ProductDetailClientProps {
  product: ProductType;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product._id,
        name: product.name,
        slug: product.slug,
        image: product.image,
        volume: product.volume,
        price: product.price,
      });
    }

    setAddedToCart(true);
    toast.success(`${quantity} × ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    openCart();
  };

  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand-green transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-brand-green transition-colors">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Image */}
          <div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-5">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-brand-green-pale">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-7xl">
                  🥛
                </div>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div>
            {product.featured && (
              <span className="inline-flex items-center rounded-full bg-brand-green text-white text-xs font-bold px-3 py-1 mb-4">
                Featured
              </span>
            )}

            <h1 className="font-heading text-4xl md:text-5xl text-gray-900 mb-3">
              {product.name}
            </h1>

            <p className="text-lg text-gray-500 mb-5">
              {product.shortDescription}
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                {product.volume}
              </span>

              <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600 capitalize">
                {product.category}
              </span>

              <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600">
                Fresh Daily
              </span>
            </div>

            <div className="text-4xl font-bold text-gray-900 mb-6">
              ₹{product.price}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Product Details
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.longDescription || product.shortDescription}
              </p>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">Quantity</p>
              <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden w-fit bg-white">
                <button
                  type="button"
                  onClick={handleDecrease}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="px-6 py-3 font-semibold text-gray-900">{quantity}</span>
                <button
                  type="button"
                  onClick={handleIncrease}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green-light transition-all shadow-md hover:shadow-lg"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              {addedToCart && (
                <Link
                  href="/cart"
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 hover:border-brand-green hover:text-brand-green transition-all"
                >
                  Go to Cart
                </Link>
              )}
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <p className="font-semibold text-gray-900 mb-1">Fresh Daily</p>
                <p className="text-sm text-gray-500">Made every morning</p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <p className="font-semibold text-gray-900 mb-1">No Preservatives</p>
                <p className="text-sm text-gray-500">Pure taste and quality</p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <p className="font-semibold text-gray-900 mb-1">Fast Delivery</p>
                <p className="text-sm text-gray-500">Delivered to your door</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}