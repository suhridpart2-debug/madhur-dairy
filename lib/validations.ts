// ═══════════════════════════════════════════════════════════════════════════════
// FILE: lib/validations.ts  — All Zod schemas for form & API validation
// ═══════════════════════════════════════════════════════════════════════════════
import { z } from 'zod';

// ─── Address Schema ───────────────────────────────────────────────────────────
export const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  street: z.string().min(5, 'Please enter your street address'),
  city: z.string().min(2, 'Please enter your city'),
  state: z.string().min(2, 'Please select your state'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
  landmark: z.string().optional(),
});

// ─── Delivery Slot Schema ─────────────────────────────────────────────────────
export const deliverySlotSchema = z.object({
  date: z.string().min(1, 'Please select a delivery date'),
  timeSlot: z.string().min(1, 'Please select a delivery time slot'),
});

// ─── Order Schema ─────────────────────────────────────────────────────────────
export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(50),
      })
    )
    .min(1, 'Your cart is empty'),
  address: addressSchema,
  deliverySlot: deliverySlotSchema,
  paymentMethod: z.enum(['cod', 'online']),
});

// ─── Cart Schema ──────────────────────────────────────────────────────────────
export const addToCartSchema = z.object({
  productId: z.string().min(1, 'Product ID required'),
  quantity: z.number().int().min(1).max(50),
});

// ─── Product Schema (Admin) ───────────────────────────────────────────────────
export const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  shortDescription: z.string().min(10).max(200, 'Max 200 characters'),
  longDescription: z.string().min(20),
  image: z.string().url('Please enter a valid image URL'),
  category: z.string().min(1, 'Please select a category'),
  volume: z.string().min(1, 'Please enter the volume (e.g. 200ml)'),
  price: z.number().min(1, 'Price must be greater than 0'),
  stock: z.number().int().min(0),
  status: z.enum(['active', 'inactive']),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
});

// ─── Contact Form Schema ──────────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type AddressInput = z.infer<typeof addressSchema>;
export type DeliverySlotInput = z.infer<typeof deliverySlotSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
