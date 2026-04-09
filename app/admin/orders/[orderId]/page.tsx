'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/admin/orders/[orderId]/page.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, Mail, Download, Printer } from 'lucide-react';
import { formatCurrency, formatDateTime, formatDate } from '@/lib/utils';
import { ORDER_STATUS_LABELS, OrderStatus } from '@/lib/constants';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const STATUS_OPTIONS = ['placed', 'confirmed', 'out_for_delivery', 'delivered', 'cancelled'];

export default function AdminOrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [updating, setUpdating] = useState(false);
  const [note, setNote] = useState('');
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then((r) => r.json())
      .then((d) => {
        setOrder(d.order);
        setNewStatus(d.order?.status || '');
      })
      .catch(() => toast.error('Failed to load order'))
      .finally(() => setLoading(false));
  }, [orderId]);

  const updateStatus = async () => {
    if (newStatus === order?.status && !note) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, note }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setOrder(data.order);
      setNote('');
      toast.success('Order status updated!');
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const resendInvoice = async () => {
    try {
      const res = await fetch(`/api/admin/invoices/${orderId}/resend`, {
        method: 'POST',
      });

      if (!res.ok) throw new Error();
      toast.success('Invoice resent to customer!');
    } catch {
      toast.error('Failed to resend invoice');
    }
  };

  const generatePDF = async () => {
    const input = document.getElementById('invoice-print-area');
    if (!input) {
      toast.error('Invoice area not found');
      return;
    }

    setDownloadingPdf(true);
    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 10;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - margin * 2;

      while (heightLeft > 0) {
        pdf.addPage();
        position = -(imgHeight - heightLeft) + margin;
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - margin * 2;
      }

      pdf.save(`${order.orderId}-invoice.pdf`);
      toast.success('PDF downloaded!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate PDF');
    } finally {
      setDownloadingPdf(false);
    }
  };

  const printInvoice = () => {
    const input = document.getElementById('invoice-print-area');
    if (!input) {
      toast.error('Invoice area not found');
      return;
    }

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) {
      toast.error('Popup blocked. Please allow popups.');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>${order.orderId} Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 24px;
              color: #111827;
            }
            .invoice-box {
              max-width: 900px;
              margin: 0 auto;
            }
            .row {
              display: flex;
              justify-content: space-between;
              gap: 16px;
            }
            .card {
              border: 1px solid #e5e7eb;
              border-radius: 16px;
              padding: 16px;
              margin-bottom: 16px;
            }
            .muted {
              color: #6b7280;
              font-size: 12px;
            }
            .title {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 8px;
            }
            .brand {
              color: #2D7A3A;
              font-weight: bold;
              font-size: 18px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 12px;
            }
            th, td {
              padding: 10px 8px;
              border-bottom: 1px solid #e5e7eb;
              text-align: left;
              font-size: 14px;
            }
            th {
              background: #f9fafb;
              font-size: 12px;
              text-transform: uppercase;
              color: #6b7280;
            }
            .text-right {
              text-align: right;
            }
            .total {
              font-size: 18px;
              font-weight: bold;
              color: #2D7A3A;
            }
          </style>
        </head>
        <body>
          <div class="invoice-box">
            ${input.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  if (loading) return <div className="py-20 text-center text-gray-400">Loading order...</div>;
  if (!order) return <div className="py-20 text-center text-red-500">Order not found</div>;

  return (
    <div className="page-enter max-w-6xl">
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green transition-colors"
          >
            <ArrowLeft size={16} /> All Orders
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-mono text-sm font-bold text-gray-900">{order.orderId}</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={generatePDF}
            disabled={downloadingPdf}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <Download size={15} />
            {downloadingPdf ? 'Generating PDF...' : 'Download PDF'}
          </button>

          <button
            onClick={printInvoice}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <Printer size={15} />
            Print Invoice
          </button>

          <button
            onClick={resendInvoice}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <Mail size={15} />
            Email Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Order info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Printable invoice area */}
          <div id="invoice-print-area" className="space-y-5 bg-white rounded-2xl">
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-brand-green font-bold text-lg mb-1">Madhur Dairy</p>
                  <p className="font-mono text-xl font-bold text-gray-900">{order.orderId}</p>
                  <p className="text-sm text-gray-500 mt-1">{formatDateTime(order.createdAt)}</p>
                </div>
                <span className={`chip-${order.status} text-sm px-4 py-1.5`}>
                  {ORDER_STATUS_LABELS[order.status as OrderStatus]}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                    Customer
                  </p>
                  <p className="font-medium text-gray-900">{order.user?.name}</p>
                  <p className="text-gray-500">{order.user?.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                    Payment
                  </p>
                  <p className="font-medium text-gray-900 capitalize">{order.payment?.method}</p>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      order.payment?.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {order.payment?.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
              <h3 className="font-semibold text-gray-900 mb-5">Order Items</h3>

              <div className="space-y-4 mb-5">
                {order.items?.map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-green-pale flex items-center justify-center text-xl shrink-0">
                      🥛
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.volume} × {item.quantity} @ {formatCurrency(item.price)}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900 text-sm">{formatCurrency(item.subtotal)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery</span>
                  <span className="text-brand-green font-medium">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-brand-green">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Delivery info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">
                  Delivery Address
                </p>
                <p className="font-semibold text-gray-900 text-sm">{order.address?.fullName}</p>
                <p className="text-sm text-gray-600 leading-relaxed mt-1">
                  {order.address?.street}
                  <br />
                  {order.address?.city}, {order.address?.state} {order.address?.pincode}
                  <br />
                  📞 {order.address?.phone}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">
                  Delivery Slot
                </p>
                <p className="font-semibold text-gray-900 text-sm">
                  {formatDate(order.deliverySlot?.date)}
                </p>
                <p className="text-sm text-gray-600 mt-1">⏰ {order.deliverySlot?.timeSlot}</p>

                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      order.telegramNotified
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {order.telegramNotified ? '✓ Telegram sent' : '✗ Telegram failed'}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      order.invoiceSent
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {order.invoiceSent ? '✓ Invoice sent' : '✗ Invoice pending'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status history */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
            <h3 className="font-semibold text-gray-900 mb-4">Status History</h3>
            <div className="space-y-3">
              {order.statusHistory?.map((h: any, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-green mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {h.status.replace(/_/g, ' ')}
                    </p>
                    {h.note && <p className="text-xs text-gray-500">{h.note}</p>}
                    <p className="text-xs text-gray-400">{formatDateTime(h.changedAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
            <h3 className="font-semibold text-gray-900 mb-4">Update Status</h3>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="input-field text-sm mb-3"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {ORDER_STATUS_LABELS[s as OrderStatus]}
                </option>
              ))}
            </select>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="input-field text-sm mb-3"
              rows={2}
              placeholder="Add a note (optional)..."
            />

            <button
              onClick={updateStatus}
              disabled={updating}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {updating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <RefreshCw size={15} />
                  Update Status
                </>
              )}
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
            <h3 className="font-semibold text-gray-900 mb-4">Invoice Actions</h3>

            <div className="space-y-3">
              <button
                onClick={generatePDF}
                disabled={downloadingPdf}
                className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
              >
                <Download size={15} />
                {downloadingPdf ? 'Generating PDF...' : 'Download PDF'}
              </button>

              <button
                onClick={printInvoice}
                className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
              >
                <Printer size={15} />
                Print Invoice
              </button>

              <button
                onClick={resendInvoice}
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
              >
                <Mail size={15} />
                Resend Invoice Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}