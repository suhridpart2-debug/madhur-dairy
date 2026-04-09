// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/api/orders/[orderId]/route.ts
// ═══════════════════════════════════════════════════════════════════════════════
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Order } from '@/models/Order';

export async function GET(_req: Request, { params }: { params: { orderId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const order = await Order.findOne({ orderId: params.orderId })
      .populate('user', 'name email image')
      .lean();

    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    // Only allow user to see own orders (admins can see all)
    if (session.user.role !== 'admin' && (order.user as any)._id.toString() !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}
