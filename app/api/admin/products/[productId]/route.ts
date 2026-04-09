// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/api/admin/products/[productId]/route.ts
// ═══════════════════════════════════════════════════════════════════════════════
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') return null;
  return session;
}

export async function PATCH(
  request: Request,
  { params }: { params: { productId: string } }
) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const body = await request.json();
    await connectDB();
    const product = await Product.findByIdAndUpdate(params.productId, body, { new: true });
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    await connectDB();
    // Soft delete: set status to inactive
    await Product.findByIdAndUpdate(params.productId, { status: 'inactive' });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
