// ═══════════════════════════════════════════════════════════════════════════════
// FILE: services/emailService.ts  — Nodemailer invoice sending
// ═══════════════════════════════════════════════════════════════════════════════
import nodemailer from 'nodemailer';
import { IOrder } from '@/models/Order';
import { IUser } from '@/models/User';
import { connectDB } from '@/lib/db';
import { Invoice } from '@/models/index';
import { generateInvoiceHTML } from '@/templates/invoiceEmail';

// Singleton transporter — reuse across serverless calls
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER!,
      pass: process.env.GMAIL_APP_PASSWORD!,
    },
  });
  return transporter;
}

function generateInvoiceNumber(orderId: string): string {
  const timestamp = Date.now().toString().slice(-6);
  return `INV-${orderId}-${timestamp}`;
}

export async function sendInvoice(order: IOrder, user: IUser): Promise<boolean> {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('[Email] Missing Gmail credentials in env');
    return false;
  }

  const invoiceNumber = generateInvoiceNumber(order.orderId);
  const html = generateInvoiceHTML(order, user);

  try {
    const info = await getTransporter().sendMail({
      from: `"Madhur Dairy" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: `✅ Order Confirmed — ${order.orderId} | Madhur Dairy`,
      html,
    });

    // Save invoice record to DB
    await connectDB();
    await Invoice.create({
      order: order._id,
      invoiceNumber,
      emailTo: user.email,
      status: 'sent',
      sentAt: new Date(),
    });

    console.log(`[Email] Invoice sent to ${user.email} — messageId: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send invoice:', error);

    // Save failed attempt
    try {
      await connectDB();
      await Invoice.create({
        order: order._id,
        invoiceNumber,
        emailTo: user.email,
        status: 'failed',
        error: String(error),
      });
    } catch {
      // Don't throw if logging fails
    }

    return false;
  }
}

// Re-send invoice from admin panel
export async function resendInvoice(order: IOrder, user: IUser): Promise<boolean> {
  const html = generateInvoiceHTML(order, user);

  try {
    await getTransporter().sendMail({
      from: `"Madhur Dairy" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: `🧾 Invoice Resent — ${order.orderId} | Madhur Dairy`,
      html,
    });

    // Update invoice record
    await connectDB();
    await Invoice.findOneAndUpdate(
      { order: order._id },
      { status: 'sent', sentAt: new Date(), error: undefined },
      { upsert: true }
    );

    return true;
  } catch (error) {
    console.error('[Email] Failed to resend invoice:', error);
    return false;
  }
}
