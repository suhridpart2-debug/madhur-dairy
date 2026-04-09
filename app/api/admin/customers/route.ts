// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/api/admin/customers/route.ts
// ═══════════════════════════════════════════════════════════════════════════════
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { Order } from '@/models/Order';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    await connectDB();
    const users = await User.find({ role: 'user' }).sort({ createdAt: -1 }).lean();

    // Aggregate order stats per user
    const userIds = users.map((u) => u._id);
    const orderStats = await Order.aggregate([
      { $match: { user: { $in: userIds } } },
      {
        $group: {
          _id: '$user',
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$total' },
          lastOrderAt: { $max: '$createdAt' },
        },
      },
    ]);

    const statsMap = new Map(orderStats.map((s) => [s._id.toString(), s]));

    const customers = users.map((u) => {
      const stats = statsMap.get(u._id.toString());
      return {
        ...u,
        totalOrders: stats?.totalOrders || 0,
        totalSpent: stats?.totalSpent || 0,
        lastOrderAt: stats?.lastOrderAt || null,
      };
    });

    return NextResponse.json({ customers });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}
