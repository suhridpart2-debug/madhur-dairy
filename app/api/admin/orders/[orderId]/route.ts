import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { updateOrderStatus } from '@/services/orderService';
import { connectDB } from '@/lib/db';
import { Order } from '@/models/Order';
import { User } from '@/models/User';
import { sendInvoice } from '@/services/emailService';

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

    // 🔥 Update order
    const order = await updateOrderStatus(params.orderId, status, note);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // 🔥 FETCH USER
    await connectDB();
    const fullOrder = await Order.findOne({ orderId: params.orderId });
    const user = fullOrder ? await User.findById(fullOrder.user) : null;

    // 🔥 EMAIL SEND ON CONFIRM
    if (status === 'confirmed' && user && fullOrder) {
      await sendInvoice(fullOrder, user);
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('[ADMIN PATCH ERROR]', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}