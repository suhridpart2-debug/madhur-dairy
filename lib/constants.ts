// ─── Order Statuses ─────────────────────────────────────────────────────────────
export const ORDER_STATUSES = {
  PLACED: 'placed',
  CONFIRMED: 'confirmed',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export type OrderStatus = (typeof ORDER_STATUSES)[keyof typeof ORDER_STATUSES];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  placed: 'Order Placed',
  confirmed: 'Confirmed',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  placed: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-green-100 text-green-700',
  out_for_delivery: 'bg-orange-100 text-orange-700',
  delivered: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-700',
};

// ─── Payment Methods ─────────────────────────────────────────────────────────────
export const PAYMENT_METHODS = {
  COD: 'cod',
  ONLINE: 'online',
} as const;

export const PAYMENT_STATUSES = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

// ─── Delivery Slots ──────────────────────────────────────────────────────────────
export const DELIVERY_SLOTS = [
  { id: 'morning', label: 'Morning', time: '7:00 AM – 10:00 AM', icon: '🌅' },
  { id: 'afternoon', label: 'Afternoon', time: '12:00 PM – 3:00 PM', icon: '☀️' },
  { id: 'evening', label: 'Evening', time: '5:00 PM – 8:00 PM', icon: '🌇' },
] as const;

// ─── Product Categories ──────────────────────────────────────────────────────────
export const PRODUCT_CATEGORIES = [
  { id: 'buttermilk', label: 'Taak / Buttermilk', slug: 'taak' },
  { id: 'lassi', label: 'Lassi', slug: 'lassi' },
  { id: 'flavoured-milk', label: 'Flavoured Milk', slug: 'flavoured-milk' },
] as const;

// ─── Delivery Fee ────────────────────────────────────────────────────────────────
export const DELIVERY_FEE = 0; // Free delivery for now
export const FREE_DELIVERY_MINIMUM = 0;

// ─── Notification Types ──────────────────────────────────────────────────────────
export const NOTIFICATION_TYPES = {
  TELEGRAM: 'telegram',
  EMAIL: 'email',
} as const;

// ─── Indian States (for address form) ───────────────────────────────────────────
export const INDIAN_STATES = [
  'Maharashtra', 'Gujarat', 'Karnataka', 'Tamil Nadu', 'Telangana',
  'Rajasthan', 'Uttar Pradesh', 'Delhi', 'West Bengal', 'Madhya Pradesh',
  'Andhra Pradesh', 'Punjab', 'Kerala', 'Bihar', 'Haryana',
];

// ─── App Config ──────────────────────────────────────────────────────────────────
export const APP_CONFIG = {
  name: 'Madhur',
  tagline: 'Pure. Fresh. Delivered.',
  description: 'Premium dairy products delivered fresh to your door.',
  contact: {
    phone: '+91 98765 43210',
    email: 'hello@madhurdairy.com',
    whatsapp: '919876543210',
  },
  social: {
    instagram: 'https://instagram.com/madhurdairy',
    facebook: 'https://facebook.com/madhurdairy',
  },
};
