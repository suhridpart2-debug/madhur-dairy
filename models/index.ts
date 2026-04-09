// ═══════════════════════════════════════════════════════════════════════════════
// FILE: models/Cart.ts
// ═══════════════════════════════════════════════════════════════════════════════
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  updatedAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const Cart: Model<ICart> =
  mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);


// ═══════════════════════════════════════════════════════════════════════════════
// FILE: models/Notification.ts
// ═══════════════════════════════════════════════════════════════════════════════

export interface INotification extends Document {
  order: mongoose.Types.ObjectId;
  type: 'telegram' | 'email';
  recipient: string;
  status: 'sent' | 'failed' | 'pending';
  messageId?: string;
  error?: string;
  sentAt?: Date;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
    type: { type: String, enum: ['telegram', 'email'], required: true },
    recipient: { type: String, required: true },
    status: { type: String, enum: ['sent', 'failed', 'pending'], default: 'pending' },
    messageId: { type: String },
    error: { type: String },
    sentAt: { type: Date },
  },
  { timestamps: true }
);

export const Notification: Model<INotification> =
  mongoose.models.Notification ||
  mongoose.model<INotification>('Notification', NotificationSchema);


// ═══════════════════════════════════════════════════════════════════════════════
// FILE: models/Invoice.ts
// ═══════════════════════════════════════════════════════════════════════════════

export interface IInvoice extends Document {
  order: mongoose.Types.ObjectId;
  invoiceNumber: string;
  emailTo: string;
  status: 'sent' | 'failed' | 'pending';
  sentAt?: Date;
  error?: string;
  createdAt: Date;
}

const InvoiceSchema = new Schema<IInvoice>(
  {
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
    invoiceNumber: { type: String, required: true, unique: true },
    emailTo: { type: String, required: true },
    status: { type: String, enum: ['sent', 'failed', 'pending'], default: 'pending' },
    sentAt: { type: Date },
    error: { type: String },
  },
  { timestamps: true }
);

export const Invoice: Model<IInvoice> =
  mongoose.models.Invoice || mongoose.model<IInvoice>('Invoice', InvoiceSchema);


// ═══════════════════════════════════════════════════════════════════════════════
// FILE: models/AnalyticsEvent.ts
// ═══════════════════════════════════════════════════════════════════════════════

export interface IAnalyticsEvent extends Document {
  event: 'page_view' | 'product_view' | 'add_to_cart' | 'order_placed';
  userId?: mongoose.Types.ObjectId;
  productId?: mongoose.Types.ObjectId;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const AnalyticsEventSchema = new Schema<IAnalyticsEvent>(
  {
    event: {
      type: String,
      enum: ['page_view', 'product_view', 'add_to_cart', 'order_placed'],
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Auto-delete events after 90 days
AnalyticsEventSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 });

export const AnalyticsEvent: Model<IAnalyticsEvent> =
  mongoose.models.AnalyticsEvent ||
  mongoose.model<IAnalyticsEvent>('AnalyticsEvent', AnalyticsEventSchema);
