// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/api/products/route.ts  — Public product listing API
// ═══════════════════════════════════════════════════════════════════════════════
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const query: Record<string, unknown> = { status: 'active' };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    const products = await Product.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({ products });
  } catch (error) {
    console.error('[GET /api/products]', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
