// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/api/admin/analytics/route.ts  — Sales analytics with aggregations
// ═══════════════════════════════════════════════════════════════════════════════
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Order } from '@/models/Order';
import { User } from '@/models/User';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '7d';

    const days = range === '90d' ? 90 : range === '30d' ? 30 : 7;
    const since = new Date();
    since.setDate(since.getDate() - days);

    const [revenueByDay, topProducts, peakHours, summaryStats, totalCustomers] =
      await Promise.all([
        // Revenue grouped by day
        Order.aggregate([
          { $match: { createdAt: { $gte: since }, status: { $ne: 'cancelled' } } },
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
              revenue: { $sum: '$total' },
              orders: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
          { $project: { date: '$_id', revenue: 1, orders: 1, _id: 0 } },
        ]),

        // Top 5 products by quantity sold
        Order.aggregate([
          { $match: { createdAt: { $gte: since }, status: { $ne: 'cancelled' } } },
          { $unwind: '$items' },
          {
            $group: {
              _id: '$items.name',
              totalQty: { $sum: '$items.quantity' },
              totalRevenue: { $sum: '$items.subtotal' },
            },
          },
          { $sort: { totalQty: -1 } },
          { $limit: 5 },
          { $project: { product: '$_id', totalQty: 1, totalRevenue: 1, _id: 0 } },
        ]),

        // Orders by hour (peak times)
        Order.aggregate([
          { $match: { createdAt: { $gte: since } } },
          {
            $group: {
              _id: { $hour: '$createdAt' },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
          { $project: { hour: '$_id', count: 1, _id: 0 } },
        ]),

        // Summary: total revenue, total orders, avg order value
        Order.aggregate([
          { $match: { createdAt: { $gte: since }, status: { $ne: 'cancelled' } } },
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: '$total' },
              totalOrders: { $sum: 1 },
              avgOrderValue: { $avg: '$total' },
            },
          },
        ]),

        User.countDocuments({ role: 'user' }),
      ]);

    const summary = summaryStats[0] || { totalRevenue: 0, totalOrders: 0, avgOrderValue: 0 };

    // Today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [todayStats, pendingCount] = await Promise.all([
      Order.aggregate([
        { $match: { createdAt: { $gte: today }, status: { $ne: 'cancelled' } } },
        { $group: { _id: null, revenue: { $sum: '$total' }, orders: { $sum: 1 } } },
      ]),
      Order.countDocuments({ status: 'placed' }),
    ]);

    return NextResponse.json({
      revenueByDay,
      topProducts,
      peakHours,
      summary: {
        ...summary,
        totalCustomers,
        todayOrders: todayStats[0]?.orders || 0,
        todayRevenue: todayStats[0]?.revenue || 0,
        pendingOrders: pendingCount,
      },
    });
  } catch (error) {
    console.error('[GET /api/admin/analytics]', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
