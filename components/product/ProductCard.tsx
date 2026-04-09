'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/product/ProductCard.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

const CATEGORY_EMOJIS: Record<string, string> = {
  taak: '🥛',
  lassi: '🍶',
  'flavoured-milk': '🍫',
};

const CATEGORY_COLORS: Record<string, string> = {
  taak: 'bg-green-50 text-green-700 border-green-200',
  lassi: 'bg-blue-50 text-blue-700 border-blue-200',
  'flavoured-milk': 'bg-orange-50 text-orange-700 border-orange-200',
};

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    shortDescription: string;
    image: string;
    volume: string;
    price: number;
    category: string;
    featured?: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleCardClick = () => {
    router.push(`/products/${product.slug}`);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    addItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      volume: product.volume,
      price: product.price,
    });

    toast.success(`${product.name} added to cart!`);
    openCart();
  };

  const emoji = CATEGORY_EMOJIS[product.category] || '🥛';
  const catColor =
    CATEGORY_COLORS[product.category] || 'bg-gray-50 text-gray-600 border-gray-200';

  return (
    <div
      onClick={handleCardClick}
      className="block group cursor-pointer"
    >
      <div className="card-premium overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-brand-green-pale rounded-2xl m-3 mb-0 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl group-hover:scale-110 transition-transform duration-300 animate-float">
                {emoji}
              </span>
            </div>
          )}

          {product.featured && (
            <div className="absolute top-3 left-3 bg-brand-green text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
              Featured
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <span
            className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full border mb-3 ${catColor}`}
          >
            {product.volume}
          </span>

          <h3 className="font-heading text-xl text-gray-900 mb-1 group-hover:text-brand-green transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
            {product.shortDescription}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-brand-green text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-green-light active:scale-95 transition-all shadow-md hover:shadow-lg"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}