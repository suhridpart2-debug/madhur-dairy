'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/product/ProductCard.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

const CATEGORY_EMOJIS: Record<string, string> = {
  taak: '🥛',
  lassi: '🍶',
  'flavoured-milk': '🍫',
};

const CATEGORY_LABELS: Record<string, string> = {
  taak: 'Refreshing',
  lassi: 'Classic',
  'flavoured-milk': "Kid's Choice",
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
  const label = CATEGORY_LABELS[product.category] || 'Premium';

  return (
    <div
      onClick={handleCardClick}
      className="block group cursor-pointer"
    >
      <div className="group bg-surface-container-low rounded-xl p-6 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,51,41,0.1)] h-full flex flex-col">
        <div className="aspect-[4/5] overflow-hidden rounded-lg mb-6 relative">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface to-secondary-container/20">
              <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                {emoji}
              </span>
            </div>
          )}

          <span className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container text-xs font-bold px-3 py-1 rounded-full uppercase">
            {label}
          </span>
          
          {product.featured && (
            <div className="absolute top-4 right-4 bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase">
              ★
            </div>
          )}
        </div>

        <h3 className="font-stitch-headline text-2xl text-primary mb-1">
          {product.name}
        </h3>
        
        <p className="text-on-surface-variant font-stitch-body text-sm mb-4 line-clamp-2 flex-grow">
          {product.shortDescription || `Fresh ${product.category} with premium taste.`}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-primary font-stitch-body">
            {formatCurrency(product.price)}
          </span>
          
          <button
            type="button"
            onClick={handleAddToCart}
            className="bg-primary text-on-primary p-3 rounded-lg flex items-center justify-center hover:bg-primary-container transition-all"
          >
            <span className="material-symbols-outlined">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}