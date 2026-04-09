// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/api/admin/orders/route.ts  — Admin: list all orders with filters
// ═══════════════════════════════════════════════════════════════════════════════
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Order } from '@/models/Order';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const payment = searchParams.get('payment');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    const query: Record<string, unknown> = {};
    if (status && status !== 'all') query.status = status;
    if (payment && payment !== 'all') query['payment.method'] = payment;
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) (query.createdAt as any).$gte = new Date(dateFrom);
      if (dateTo) (query.createdAt as any).$lte = new Date(dateTo + 'T23:59:59');
    }

    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate('user', 'name email image phone')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Order.countDocuments(query),
    ]);

    return NextResponse.json({ orders, total, pages: Math.ceil(total / limit), page });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
