// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/api/cart/route.ts  — Cart management API
// ═══════════════════════════════════════════════════════════════════════════════
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Cart } from '@/models/index';
import { Product } from '@/models/Product';
import { addToCartSchema } from '@/lib/validations';

// GET — fetch user's cart with populated products
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const cart = await Cart.findOne({ user: session.user.id })
      .populate('items.product', 'name slug image price volume status')
      .lean();

    if (!cart) return NextResponse.json({ cart: { items: [], total: 0 } });

    // Filter out inactive/deleted products
    const validItems = (cart.items || []).filter((item: any) => item.product?.status === 'active');
    const total = validItems.reduce(
      (sum: number, item: any) => sum + item.product.price * item.quantity,
      0
    );

    return NextResponse.json({ cart: { items: validItems, total } });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

// POST — add or update item in cart
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = addToCartSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { productId, quantity } = parsed.data;

    // Verify product exists and is active
    await connectDB();
    const product = await Product.findOne({ _id: productId, status: 'active' });
    if (!product) return NextResponse.json({ error: 'Product not available' }, { status: 404 });

    // Upsert cart item
    const cart = await Cart.findOneAndUpdate(
      { user: session.user.id },
      { $setOnInsert: { user: session.user.id } },
      { upsert: true, new: true }
    );

    const existingItem = cart.items.find((i: any) => i.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity = quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

// DELETE — remove item from cart
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { productId } = await request.json();
    await connectDB();
    await Cart.findOneAndUpdate(
      { user: session.user.id },
      { $pull: { items: { product: productId } } }
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 });
  }
}
