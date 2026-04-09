// ═══════════════════════════════════════════════════════════════════════════════
// FILE: services/orderService.ts  — Order creation and management logic
// ═══════════════════════════════════════════════════════════════════════════════
import { connectDB } from '@/lib/db';
import { Order, IOrder } from '@/models/Order';
import { Product } from '@/models/Product';
import { User } from '@/models/User';
import { Cart } from '@/models/index';
import { generateOrderId } from '@/lib/utils';
import { sendOrderAlert } from './telegramService';
import { sendInvoice } from './emailService';

interface CreateOrderInput {
  userId: string;
  items: Array<{ productId: string; quantity: number }>;
  address: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  deliverySlot: {
    date: string;
    timeSlot: string;
  };
  paymentMethod: 'cod' | 'online';
}

export async function createOrder(input: CreateOrderInput): Promise<IOrder> {
  await connectDB();

  // 1. Fetch and validate products
  const productIds = input.items.map((i) => i.productId);
  const products = await Product.find({
    _id: { $in: productIds },
    status: 'active',
  });

  if (products.length !== input.items.length) {
    throw new Error('One or more products are unavailable');
  }

  // 2. Build order items with current prices
  const orderItems = input.items.map((inputItem) => {
    const product = products.find((p) => p._id.toString() === inputItem.productId);
    if (!product) throw new Error(`Product not found: ${inputItem.productId}`);

    return {
      product: product._id,
      name: product.name,
      image: product.image,
      volume: product.volume,
      price: product.price,
      quantity: inputItem.quantity,
      subtotal: product.price * inputItem.quantity,
    };
  });

  // 3. Calculate totals
  const subtotal = orderItems.reduce((sum, i) => sum + i.subtotal, 0);
  const deliveryFee = 0; // Free delivery
  const total = subtotal + deliveryFee;

  // 4. Generate unique order ID
  const orderCount = await Order.countDocuments();
  const orderId = generateOrderId(orderCount + 1);

  // 5. Create order document
  const order = await Order.create({
    orderId,
    user: input.userId,
    items: orderItems,
    address: input.address,
    deliverySlot: {
      date: new Date(input.deliverySlot.date),
      timeSlot: input.deliverySlot.timeSlot,
    },
    payment: {
      method: input.paymentMethod,
      status: input.paymentMethod === 'cod' ? 'pending' : 'pending',
    },
    subtotal,
    deliveryFee,
    total,
    status: 'placed',
    statusHistory: [{ status: 'placed', changedAt: new Date(), note: 'Order placed by customer' }],
  });

  // 6. Clear user's cart
  await Cart.findOneAndUpdate(
    { user: input.userId },
    { $set: { items: [] } }
  );

  // 7. Fetch user for notifications (non-blocking)
  const user = await User.findById(input.userId);
  if (user) {
    // Fire-and-forget: Telegram + Email
    Promise.all([
      sendOrderAlert(order, user).then((ok) =>
        Order.findByIdAndUpdate(order._id, { telegramNotified: ok })
      ),
      sendInvoice(order, user).then((ok) =>
        Order.findByIdAndUpdate(order._id, { invoiceSent: ok })
      ),
    ]).catch((err) => console.error('[OrderService] Notification error:', err));
  }

  return order;
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
  note?: string
): Promise<IOrder | null> {
  await connectDB();

  const order = await Order.findOneAndUpdate(
    { orderId },
    {
      $set: { status },
      $push: {
        statusHistory: {
          status,
          changedAt: new Date(),
          note: note || `Status updated to ${status}`,
        },
      },
    },
    { new: true }
  );

  return order;
}

export async function getOrdersByUser(userId: string) {
  await connectDB();
  return Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .select('-__v')
    .lean();
}

export async function getOrderById(orderId: string) {
  await connectDB();
  return Order.findOne({ orderId }).populate('user', 'name email image').lean();
}
