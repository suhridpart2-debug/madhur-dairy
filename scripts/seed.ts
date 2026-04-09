// ═══════════════════════════════════════════════════════════════════════════════
// FILE: scripts/seed.ts  — Seed database with Madhur products
// Run: npx tsx scripts/seed.ts
// ═══════════════════════════════════════════════════════════════════════════════
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI!;

// ─── Product Schema (inline for seed script) ─────────────────────────────────
const ProductSchema = new mongoose.Schema({
  name: String, slug: String, shortDescription: String,
  longDescription: String, image: String, images: [String],
  category: String, volume: String, price: Number, stock: Number,
  status: String, featured: Boolean, tags: [String], nutritionInfo: Object,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// ─── Seed data ────────────────────────────────────────────────────────────────
const products = [
  // 🥛 TAAK (POUCH)
  {
    name: 'Madhur Taak (Pouch)',
    slug: 'madhur-taak-pouch',
    shortDescription: 'Fresh buttermilk in easy pouch.',
    longDescription: 'Daily fresh buttermilk made from pure curd. Light, refreshing and perfect for everyday use.',
    image: '/products/taak-pouch.png',
    category: 'taak',
    volume: '500ml',
    price: 20,
    stock: 200,
    status: 'active',
    featured: true,
  },

  // 🥛 TAAK (BOTTLE)
  {
    name: 'Madhur Taak (Bottle)',
    slug: 'madhur-taak-bottle',
    shortDescription: 'Premium bottled buttermilk.',
    longDescription: 'Hygienic bottled buttermilk made fresh every morning. Rich taste and perfect for family.',
    image: '/products/taak-bottle.png',
    category: 'taak',
    volume: '1L',
    price: 40,
    stock: 150,
    status: 'active',
    featured: false,
  },

  // 🥤 LASSI (POUCH)
  {
    name: 'Madhur Sweet Lassi (Pouch)',
    slug: 'madhur-lassi-pouch',
    shortDescription: 'Thick sweet lassi in pouch.',
    longDescription: 'Creamy and delicious sweet lassi made from fresh curd. Perfect refreshment drink.',
    image: '/products/lassipouch.png',
    category: 'lassi',
    volume: '200ml',
    price: 25,
    stock: 150,
    status: 'active',
    featured: true,
  },

  // 🥤 LASSI (BOTTLE)
  {
    name: 'Madhur Sweet Lassi (Bottle)',
    slug: 'madhur-lassi-bottle',
    shortDescription: 'Premium bottled lassi.',
    longDescription: 'Rich and creamy lassi in hygienic bottle packaging. Perfect for daily refreshment.',
    image: '/products/lassibottle.png',
    category: 'lassi',
    volume: '500ml',
    price: 50,
    stock: 120,
    status: 'active',
    featured: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑  Cleared existing products');

    // Insert seed products
    const inserted = await Product.insertMany(products);
    console.log(`🌱 Inserted ${inserted.length} products:`);
    inserted.forEach((p: any) => console.log(`   • ${p.name} (${p.volume}) — ₹${p.price}`));

    console.log('\n✅ Seed complete!');
  } catch (error) {
    console.error('❌ Seed error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
