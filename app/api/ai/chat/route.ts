// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/api/ai/chat/route.ts  — AI support chat (Claude API)
// ═══════════════════════════════════════════════════════════════════════════════
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Madhur's friendly customer support assistant. Madhur is a premium dairy brand in Maharashtra, India.

Products:
- Madhur Taak (Buttermilk): 200ml (₹15), 500ml (₹35), 1L (₹65) — Fresh, no preservatives, slightly spiced
- Madhur Lassi: 200ml (₹25), 500ml (₹55) — Thick, creamy, available in Sweet and Mango flavors
- Madhur Flavoured Milk: 200ml (₹30) — Available in Chocolate, Strawberry, and Rose flavors

You can help with:
1. Product information and pricing
2. Delivery areas: [Pimpri, Chinchwad, Wakad, Baner, Aundh, Hinjewadi, Kothrud, Shivajinagar] (Maharashtra)
3. Delivery timings: Morning 7–10 AM, Afternoon 12–3 PM, Evening 5–8 PM
4. Payment: Cash on Delivery (COD) only. Online payment coming soon.
5. Freshness: All products made fresh daily. No preservatives. Consume within 24 hours of delivery.
6. Order tracking: Customers can track orders in "My Orders" section after signing in.
7. Cancellations: Can cancel before order is "Confirmed". Contact us via WhatsApp.
8. Refunds: Reach out within 2 hours of delivery if there's any quality issue.

Tone: Warm, helpful, concise. Use simple English. Occasional Hindi/Marathi word is fine (ji, namaste).
For questions outside these topics, say: "For this, please WhatsApp us at +91 98765 43210."
Keep each response under 3 sentences unless a list is needed.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Limit conversation history to last 10 messages (cost control)
    const recentMessages = messages.slice(-10);

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: recentMessages,
    });

    const reply = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('');

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('[AI Chat]', error);
    return NextResponse.json(
      { reply: 'Sorry, I am having trouble right now. Please WhatsApp us at +91 98765 43210.' },
      { status: 200 } // Return 200 with fallback so UI doesn't break
    );
  }
}


// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/api/admin/invoices/[orderId]/resend/route.ts  — Resend invoice
// ═══════════════════════════════════════════════════════════════════════════════
// (Separate file — shown here for reference)
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
// import { connectDB } from '@/lib/db';
// import { Order } from '@/models/Order';
// import { User } from '@/models/User';
// import { resendInvoice } from '@/services/emailService';
//
// export async function POST(_req: Request, { params }: { params: { orderId: string } }) {
//   const session = await getServerSession(authOptions);
//   if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//   await connectDB();
//   const order = await Order.findOne({ orderId: params.orderId });
//   if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
//   const user = await User.findById(order.user);
//   if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
//   const ok = await resendInvoice(order, user);
//   return NextResponse.json({ success: ok });
// }
