// ═══════════════════════════════════════════════════════════════════════════════
// FILE: services/telegramService.ts
// ═══════════════════════════════════════════════════════════════════════════════
import { IOrder } from '@/models/Order';
import { IUser } from '@/models/User';
import { connectDB } from '@/lib/db';
import { Notification } from '@/models/index';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils';

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

function formatOrderMessage(order: IOrder, user: IUser): string {
  const items = order.items
    .map(
      (i) =>
        `  • <b>${i.name}</b> (${i.volume}) × ${i.quantity} — ${formatCurrency(i.subtotal)}`
    )
    .join('\n');

  const paymentDisplay =
    order.payment.method === 'cod' ? '💵 Cash on Delivery' : '💳 Online Payment';

  return `
🛒 <b>New Order — ${order.orderId}</b>

👤 <b>Customer:</b> ${user.name}
📧 <b>Email:</b> ${user.email}
📞 <b>Phone:</b> ${order.address.phone}

📦 <b>Items Ordered:</b>
${items}

💰 <b>Subtotal:</b> ${formatCurrency(order.subtotal)}
🚚 <b>Delivery:</b> FREE
💵 <b>Total:</b> <b>${formatCurrency(order.total)}</b>

${paymentDisplay}

📍 <b>Delivery Address:</b>
${order.address.fullName}
${order.address.street}
${order.address.city}, ${order.address.state} — ${order.address.pincode}
${order.address.landmark ? `Near: ${order.address.landmark}` : ''}

🗓 <b>Delivery Date:</b> ${formatDate(order.deliverySlot.date)}
⏰ <b>Time Slot:</b> ${order.deliverySlot.timeSlot}

🕐 <b>Order Placed:</b> ${formatDateTime(order.createdAt)}

<i>Reply "CONFIRM ${order.orderId}" to confirm this order.</i>
  `.trim();
}

export async function sendOrderAlert(
  order: IOrder,
  user: IUser
): Promise<boolean> {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!chatId || !process.env.TELEGRAM_BOT_TOKEN) {
    console.warn('[Telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    return false;
  }

  try {
    const message = formatOrderMessage(order, user);

    const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();

    // Log notification to DB
    await connectDB();
    await Notification.create({
      order: order._id,
      type: 'telegram',
      recipient: chatId,
      status: result.ok ? 'sent' : 'failed',
      messageId: result.ok ? String(result.result?.message_id) : undefined,
      error: result.ok ? undefined : JSON.stringify(result.description),
      sentAt: result.ok ? new Date() : undefined,
    });

    return result.ok === true;
  } catch (error) {
    console.error('[Telegram] Failed to send notification:', error);

    // Log failed attempt
    try {
      await connectDB();
      await Notification.create({
        order: order._id,
        type: 'telegram',
        recipient: chatId,
        status: 'failed',
        error: String(error),
      });
    } catch {
      // Don't throw if logging fails
    }

    return false;
  }
}
