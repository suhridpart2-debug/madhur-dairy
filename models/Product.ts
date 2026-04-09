import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  images: string[];
  category: string;
  volume: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  featured: boolean;
  tags: string[];
  nutritionInfo?: {
    calories?: string;
    protein?: string;
    fat?: string;
    carbs?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true },
    shortDescription: { type: String, required: true, maxlength: 200 },
    longDescription: { type: String, required: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    category: { type: String, required: true },
    volume: { type: String, required: true }, // e.g. "200ml", "500ml"
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 100, min: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
    nutritionInfo: {
      calories: String,
      protein: String,
      fat: String,
      carbs: String,
    },
  },
  { timestamps: true }
);

ProductSchema.index({ status: 1, featured: -1 });
ProductSchema.index({ category: 1 });

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
