// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/api/admin/orders/[orderId]/route.ts  — Admin: update order status
// ═══════════════════════════════════════════════════════════════════════════════
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { updateOrderStatus } from '@/services/orderService';

export async function PATCH(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { status, note } = await request.json();
    const validStatuses = ['placed', 'confirmed', 'out_for_delivery', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const order = await updateOrderStatus(params.orderId, status, note);
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
