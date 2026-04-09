// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/api/products/[slug]/route.ts
// ═══════════════════════════════════════════════════════════════════════════════
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const product = await Product.findOne({ slug: params.slug, status: 'active' }).lean();
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
