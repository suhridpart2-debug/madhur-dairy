// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/(customer)/products/[slug]/page.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';
import ProductDetailClient from '@/components/product/ProductDetailClient';

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

interface PageProps {
  params: {
    slug: string;
  };
}

async function getProduct(slug: string): Promise<ProductType | null> {
  try {
    await connectDB();

    const product = await Product.findOne({
      slug,
      status: 'active',
    }).lean();

    if (!product) return null;

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found — Madhur',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.name} — Madhur`,
    description:
      product.shortDescription ||
      product.longDescription ||
      'Fresh dairy product from Madhur.',
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}