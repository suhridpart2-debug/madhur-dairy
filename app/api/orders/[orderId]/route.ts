import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Order } from '@/models/Order';
import { User } from '@/models/User';
import { sendInvoice } from '@/services/emailService';

// GET (same as before)
export async function GET(_req: Request, { params }: { params: { orderId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const order = await Order.findOne({ orderId: params.orderId })
      .populate('user', 'name email image')
      .lean();

    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    if (session.user.role !== 'admin' && (order.user as any)._id.toString() !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}

// 🔥 NEW: PATCH → update status + send email
export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { status } = await req.json();

    await connectDB();

    const order = await Order.findOneAndUpdate(
      { orderId: params.orderId },
      { status },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // 🔥 USER FETCH
    const user = await User.findById(order.user);

    // 🔥 EMAIL SEND ON CONFIRM
    if (status === 'confirmed' && user) {
      await sendInvoice(order, user);
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('[PATCH ORDER ERROR]', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}