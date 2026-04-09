import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId | string;
  name: string;
  image: string;
  volume: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface IOrder extends Document {
  orderId: string;
  user: mongoose.Types.ObjectId | string;
  items: IOrderItem[];
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
    date: Date;
    timeSlot: string;
  };
  payment: {
    method: 'cod' | 'online';
    status: 'pending' | 'paid' | 'failed' | 'refunded';
    transactionId?: string;
  };
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'placed' | 'confirmed' | 'out_for_delivery' | 'delivered' | 'cancelled';
  statusHistory: Array<{
    status: string;
    changedAt: Date;
    note?: string;
  }>;
  telegramNotified: boolean;
  invoiceSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true },
  image: { type: String },
  volume: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  subtotal: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, unique: true, required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: [OrderItemSchema],
    address: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      landmark: { type: String },
    },
    deliverySlot: {
      date: { type: Date, required: true },
      timeSlot: { type: String, required: true },
    },
    payment: {
      method: { type: String, enum: ['cod', 'online'], default: 'cod' },
      status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
      transactionId: { type: String },
    },
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['placed', 'confirmed', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'placed',
      index: true,
    },
    statusHistory: [
      {
        status: { type: String },
        changedAt: { type: Date, default: Date.now },
        note: { type: String },
      },
    ],
    telegramNotified: { type: Boolean, default: false },
    invoiceSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ user: 1, createdAt: -1 });

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
