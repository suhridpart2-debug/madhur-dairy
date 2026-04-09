'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/admin/products/page.tsx  — Admin Product Management
// ═══════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [form, setForm] = useState({ name: '', slug: '', shortDescription: '', longDescription: '', image: '', category: 'taak', volume: '', price: '', stock: '100', status: 'active', featured: false });
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch { toast.error('Failed to load products'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openAdd = () => { setEditProduct(null); setForm({ name: '', slug: '', shortDescription: '', longDescription: '', image: '', category: 'taak', volume: '', price: '', stock: '100', status: 'active', featured: false }); setShowForm(true); };
  const openEdit = (p: any) => { setEditProduct(p); setForm({ name: p.name, slug: p.slug, shortDescription: p.shortDescription, longDescription: p.longDescription, image: p.image, category: p.category, volume: p.volume, price: String(p.price), stock: String(p.stock), status: p.status, featured: p.featured }); setShowForm(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      const url = editProduct ? `/api/admin/products/${editProduct._id}` : '/api/admin/products';
      const method = editProduct ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      toast.success(editProduct ? 'Product updated!' : 'Product created!');
      setShowForm(false);
      fetchProducts();
    } catch (e: any) { toast.error(e.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const toggleStatus = async (p: any) => {
    const newStatus = p.status === 'active' ? 'inactive' : 'active';
    await fetch(`/api/admin/products/${p._id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) });
    setProducts((prev) => prev.map((x) => x._id === p._id ? { ...x, status: newStatus } : x));
    toast.success(`Product ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
  };

  const deleteProduct = async (p: any) => {
    if (!confirm(`Deactivate "${p.name}"?`)) return;
    await fetch(`/api/admin/products/${p._id}`, { method: 'DELETE' });
    fetchProducts();
    toast.success('Product deactivated');
  };

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-3xl text-gray-900">Products</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Product table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Product', 'Category', 'Volume', 'Price', 'Stock', 'Status', 'Featured', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={8} className="py-16 text-center text-gray-400 text-sm">Loading products...</td></tr>
              ) : products.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-green-pale flex items-center justify-center overflow-hidden shrink-0">
                        {p.image ? <Image src={p.image} alt={p.name} width={40} height={40} className="object-cover" /> : <span className="text-xl">🥛</span>}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{p.name}</p>
                        <p className="text-xs text-gray-500 font-mono">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 capitalize">{p.category}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{p.volume}</td>
                  <td className="px-5 py-4 text-sm font-bold text-gray-900">{formatCurrency(p.price)}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{p.stock}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleStatus(p)} className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.status === 'active' ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                      {p.status}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.featured ? 'bg-brand-soft-gold/20 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.featured ? '⭐ Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-brand-green-pale text-gray-500 hover:text-brand-green transition-colors"><Pencil size={15} /></button>
                      <button onClick={() => deleteProduct(p)} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
            <h2 className="font-heading text-2xl text-gray-900 mb-6">{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <div className="space-y-4">
              {[
                { key: 'name', label: 'Product Name', placeholder: 'Madhur Taak' },
                { key: 'slug', label: 'Slug', placeholder: 'madhur-taak-500ml' },
                { key: 'volume', label: 'Volume', placeholder: '500ml' },
                { key: 'image', label: 'Image URL', placeholder: 'https://res.cloudinary.com/...' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                  <input value={(form as any)[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="input-field" placeholder={placeholder} />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price (₹)</label>
                  <input type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} className="input-field" placeholder="35" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Stock</label>
                  <input type="number" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} className="input-field" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="input-field">
                  <option value="taak">Taak / Buttermilk</option>
                  <option value="lassi">Lassi</option>
                  <option value="flavoured-milk">Flavoured Milk</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Short Description</label>
                <input value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} className="input-field" placeholder="One-line description" maxLength={200} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Long Description</label>
                <textarea value={form.longDescription} onChange={(e) => setForm((f) => ({ ...f, longDescription: e.target.value }))} className="input-field" rows={4} placeholder="Full product description..." />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 rounded accent-brand-green" />
                  <span className="text-sm font-medium text-gray-700">Featured product</span>
                </label>
                <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="input-field w-auto py-2">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-7">
              <button onClick={() => setShowForm(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 disabled:opacity-70">
                {saving ? 'Saving...' : editProduct ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
