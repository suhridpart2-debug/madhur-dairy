// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/api/orders/route.ts  — Create order (POST) and list user orders (GET)
// ═══════════════════════════════════════════════════════════════════════════════
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createOrder, getOrdersByUser } from '@/services/orderService';
import { createOrderSchema } from '@/lib/validations';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = createOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message, details: parsed.error.errors },
        { status: 400 }
      );
    }

    const order = await createOrder({
      userId: session.user.id,
      ...parsed.data,
    });

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      order: {
        _id: order._id,
        orderId: order.orderId,
        total: order.total,
        status: order.status,
      },
    });
  } catch (error: any) {
    console.error('[POST /api/orders]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const orders = await getOrdersByUser(session.user.id);
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
