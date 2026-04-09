// ═══════════════════════════════════════════════════════════════════════════════
// FILE: templates/invoiceEmail.ts  — Professional HTML invoice email template
// ═══════════════════════════════════════════════════════════════════════════════
import { IOrder } from '@/models/Order';
import { IUser } from '@/models/User';
import { formatCurrency, formatDate } from '@/lib/utils';

export function generateInvoiceHTML(order: IOrder, user: IUser): string {
  const itemRows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #F3F4F6;">
          <div style="font-weight:600;color:#111827;">${item.name}</div>
          <div style="font-size:13px;color:#6B7280;">${item.volume}</div>
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #F3F4F6;text-align:center;color:#374151;">${item.quantity}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #F3F4F6;text-align:right;color:#374151;">${formatCurrency(item.price)}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #F3F4F6;text-align:right;font-weight:600;color:#111827;">${formatCurrency(item.subtotal)}</td>
      </tr>
    `
    )
    .join('');

  const paymentBadge =
    order.payment.method === 'cod'
      ? `<span style="background:#FEF3C7;color:#92400E;padding:3px 10px;border-radius:12px;font-size:13px;font-weight:600;">Cash on Delivery</span>`
      : `<span style="background:#D1FAE5;color:#065F46;padding:3px 10px;border-radius:12px;font-size:13px;font-weight:600;">Online Payment</span>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Order Confirmation — ${order.orderId}</title>
</head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9FAFB;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2D7A3A 0%,#3d9e4a 100%);padding:32px 40px;text-align:center;">
              <div style="font-size:32px;font-weight:800;color:#FFFFFF;letter-spacing:-1px;">Madhur</div>
              <div style="color:#A7F3D0;font-size:14px;margin-top:4px;letter-spacing:2px;text-transform:uppercase;">Pure · Fresh · Delivered</div>
            </td>
          </tr>

          <!-- Order confirmed banner -->
          <tr>
            <td style="background:#ECFDF5;padding:20px 40px;text-align:center;border-bottom:1px solid #D1FAE5;">
              <div style="font-size:22px;">✅</div>
              <div style="font-size:18px;font-weight:700;color:#065F46;margin-top:6px;">Order Confirmed!</div>
              <div style="font-size:14px;color:#6B7280;margin-top:4px;">
                Thank you, ${user.name.split(' ')[0]}! Your order has been placed successfully.
              </div>
            </td>
          </tr>

          <!-- Order details -->
          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;font-weight:600;">Order ID</div>
                          <div style="font-size:16px;font-weight:700;color:#111827;font-family:monospace;margin-top:4px;">${order.orderId}</div>
                        </td>
                        <td align="right">
                          <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;font-weight:600;">Order Date</div>
                          <div style="font-size:14px;color:#374151;margin-top:4px;">${formatDate(order.createdAt)}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Items table -->
              <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6B7280;margin-bottom:12px;">Items Ordered</div>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #F3F4F6;border-radius:12px;overflow:hidden;">
                <thead>
                  <tr style="background:#F9FAFB;">
                    <th style="padding:10px 16px;text-align:left;font-size:12px;color:#6B7280;font-weight:600;">Product</th>
                    <th style="padding:10px 16px;text-align:center;font-size:12px;color:#6B7280;font-weight:600;">Qty</th>
                    <th style="padding:10px 16px;text-align:right;font-size:12px;color:#6B7280;font-weight:600;">Price</th>
                    <th style="padding:10px 16px;text-align:right;font-size:12px;color:#6B7280;font-weight:600;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows}
                </tbody>
              </table>

              <!-- Totals -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
                <tr>
                  <td style="padding:8px 0;color:#6B7280;font-size:14px;">Subtotal</td>
                  <td style="padding:8px 0;text-align:right;color:#374151;font-size:14px;">${formatCurrency(order.subtotal)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#6B7280;font-size:14px;">Delivery</td>
                  <td style="padding:8px 0;text-align:right;color:#2D7A3A;font-size:14px;font-weight:600;">FREE ✓</td>
                </tr>
                <tr>
                  <td colspan="2" style="border-top:2px solid #F3F4F6;padding-top:12px;"></td>
                </tr>
                <tr>
                  <td style="font-size:17px;font-weight:700;color:#111827;">Total</td>
                  <td style="text-align:right;font-size:20px;font-weight:800;color:#2D7A3A;">${formatCurrency(order.total)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Delivery Info -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48%" style="background:#F9FAFB;border-radius:12px;padding:20px;vertical-align:top;">
                    <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;font-weight:600;margin-bottom:10px;">Delivery Address</div>
                    <div style="font-size:14px;color:#111827;font-weight:600;">${order.address.fullName}</div>
                    <div style="font-size:13px;color:#6B7280;margin-top:4px;line-height:1.6;">
                      ${order.address.street}<br/>
                      ${order.address.city}, ${order.address.state}<br/>
                      Pincode: ${order.address.pincode}<br/>
                      📞 ${order.address.phone}
                    </div>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background:#F9FAFB;border-radius:12px;padding:20px;vertical-align:top;">
                    <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;font-weight:600;margin-bottom:10px;">Delivery Slot</div>
                    <div style="font-size:14px;color:#111827;font-weight:600;">${formatDate(order.deliverySlot.date)}</div>
                    <div style="font-size:13px;color:#6B7280;margin-top:4px;">⏰ ${order.deliverySlot.timeSlot}</div>
                    <div style="margin-top:12px;">${paymentBadge}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Thank you message -->
          <tr>
            <td style="background:#F0FDF4;padding:24px 40px;text-align:center;border-top:1px solid #D1FAE5;">
              <div style="font-size:16px;color:#065F46;font-weight:600;">🙏 Thank you for choosing Madhur!</div>
              <div style="font-size:13px;color:#6B7280;margin-top:8px;line-height:1.6;">
                Our products are made fresh daily with no preservatives.<br/>
                For support, contact us at <a href="mailto:hello@madhurdairy.com" style="color:#2D7A3A;">hello@madhurdairy.com</a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#111827;padding:24px 40px;text-align:center;">
              <div style="color:#9CA3AF;font-size:12px;line-height:1.8;">
                <strong style="color:#FFFFFF;">Madhur Dairy</strong><br/>
                Pure. Fresh. Delivered.<br/>
                © ${new Date().getFullYear()} Madhur Dairy. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
