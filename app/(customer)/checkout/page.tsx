'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/(customer)/checkout/page.tsx  — Multi-step checkout
// ═══════════════════════════════════════════════════════════════════════════════
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, CreditCard, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { addressSchema, AddressInput } from '@/lib/validations';
import { formatCurrency, formatDate, getDeliveryDates } from '@/lib/utils';
import { DELIVERY_SLOTS, INDIAN_STATES } from '@/lib/constants';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 1, label: 'Address', icon: MapPin },
  { id: 2, label: 'Delivery', icon: Clock },
  { id: 3, label: 'Payment', icon: CreditCard },
  { id: 4, label: 'Review', icon: CheckCircle },
];

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<AddressInput | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [placing, setPlacing] = useState(false);

  const deliveryDates = getDeliveryDates(3);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressInput>({ resolver: zodResolver(addressSchema) });

  const onAddressSubmit = (data: AddressInput) => {
    setAddress(data);
    setStep(2);
  };

  const placeOrder = async () => {
    if (!address || !selectedDate || !selectedSlot) return;
    setPlacing(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          address,
          deliverySlot: { date: selectedDate, timeSlot: selectedSlot },
          paymentMethod: 'cod',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to place order');

      clearCart();
      toast.success('Order placed successfully!');
      router.push(`/orders/${data.orderId}`);
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <span className="text-6xl block mb-4">🛒</span>
          <h2 className="font-heading text-2xl text-gray-900 mb-2">Your cart is empty</h2>
          <a href="/products" className="btn-primary inline-flex mt-4">Browse Products</a>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="section-container max-w-4xl">
        <h1 className="font-heading text-3xl text-gray-900 mb-8">Checkout</h1>

        {/* Step indicator */}
        <div className="flex items-center mb-10">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = s.id === step;
            const isDone = s.id < step;
            return (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-brand-green text-white'
                        : isActive
                        ? 'bg-brand-green text-white shadow-green-glow'
                        : 'bg-white border-2 border-gray-200 text-gray-400'
                    }`}
                  >
                    {isDone ? <CheckCircle size={18} /> : <Icon size={18} />}
                  </div>
                  <p className={`text-xs font-semibold mt-1.5 ${isActive ? 'text-brand-green' : isDone ? 'text-gray-600' : 'text-gray-400'}`}>
                    {s.label}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-3 mb-4 rounded transition-all ${isDone ? 'bg-brand-green' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* STEP 1: Address */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-7 shadow-card border border-gray-100"
                >
                  <h2 className="font-semibold text-lg text-gray-900 mb-6 flex items-center gap-2">
                    <MapPin size={18} className="text-brand-green" /> Delivery Address
                  </h2>
                  <form onSubmit={handleSubmit(onAddressSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                        <input {...register('fullName')} className="input-field" placeholder="Your full name" />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone *</label>
                        <input {...register('phone')} className="input-field" placeholder="10-digit mobile number" />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Street Address *</label>
                      <input {...register('street')} className="input-field" placeholder="House no., street, area" />
                      {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">City *</label>
                        <input {...register('city')} className="input-field" placeholder="Pune" />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">State *</label>
                        <select {...register('state')} className="input-field">
                          <option value="">Select state</option>
                          {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pincode *</label>
                        <input {...register('pincode')} className="input-field" placeholder="411045" maxLength={6} />
                        {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Landmark (optional)</label>
                      <input {...register('landmark')} className="input-field" placeholder="Near school, park, etc." />
                    </div>
                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
                      Continue to Delivery <ChevronRight size={18} />
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STEP 2: Delivery Slot */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-7 shadow-card border border-gray-100"
                >
                  <h2 className="font-semibold text-lg text-gray-900 mb-6 flex items-center gap-2">
                    <Clock size={18} className="text-brand-green" /> Choose Delivery Slot
                  </h2>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Select Date</p>
                    <div className="grid grid-cols-3 gap-3">
                      {deliveryDates.map((date) => {
                        const iso = date.toISOString().split('T')[0];
                        return (
                          <button
                            key={iso}
                            onClick={() => setSelectedDate(iso)}
                            className={`p-4 rounded-xl border-2 text-center transition-all ${
                              selectedDate === iso
                                ? 'border-brand-green bg-brand-green-pale text-brand-green'
                                : 'border-gray-200 hover:border-brand-green hover:bg-brand-green-pale'
                            }`}
                          >
                            <p className="text-xs text-gray-500 font-medium">
                              {date.toLocaleDateString('en-IN', { weekday: 'short' })}
                            </p>
                            <p className="font-bold text-lg mt-0.5">{date.getDate()}</p>
                            <p className="text-xs text-gray-500">
                              {date.toLocaleDateString('en-IN', { month: 'short' })}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Select Time Slot</p>
                    <div className="space-y-3">
                      {DELIVERY_SLOTS.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                            selectedSlot === slot.time
                              ? 'border-brand-green bg-brand-green-pale'
                              : 'border-gray-200 hover:border-brand-green hover:bg-brand-green-pale'
                          }`}
                        >
                          <span className="text-2xl">{slot.icon}</span>
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">{slot.label}</p>
                            <p className="text-sm text-gray-500">{slot.time}</p>
                          </div>
                          {selectedSlot === slot.time && (
                            <CheckCircle size={20} className="text-brand-green ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(1)} className="btn-secondary flex items-center gap-2">
                      <ChevronLeft size={18} /> Back
                    </button>
                    <button
                      onClick={() => {
                        if (!selectedDate || !selectedSlot) {
                          toast.error('Please select both a date and time slot');
                          return;
                        }
                        setStep(3);
                      }}
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      Continue <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Payment */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-7 shadow-card border border-gray-100"
                >
                  <h2 className="font-semibold text-lg text-gray-900 mb-6 flex items-center gap-2">
                    <CreditCard size={18} className="text-brand-green" /> Payment Method
                  </h2>

                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-5 rounded-xl border-2 border-brand-green bg-brand-green-pale cursor-pointer">
                      <span className="text-2xl">💵</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay when your order arrives</p>
                      </div>
                      <CheckCircle size={20} className="text-brand-green" />
                    </div>
                    <div className="flex items-center gap-4 p-5 rounded-xl border-2 border-gray-200 opacity-60 cursor-not-allowed">
                      <span className="text-2xl">💳</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Online Payment</p>
                        <p className="text-sm text-gray-500">UPI, Cards — Coming Soon</p>
                      </div>
                      <span className="text-xs font-bold bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Soon</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(2)} className="btn-secondary flex items-center gap-2">
                      <ChevronLeft size={18} /> Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      Review Order <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Review */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-7 shadow-card border border-gray-100"
                >
                  <h2 className="font-semibold text-lg text-gray-900 mb-6 flex items-center gap-2">
                    <CheckCircle size={18} className="text-brand-green" /> Review Your Order
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Delivery Address</p>
                      <p className="text-sm text-gray-900 font-medium">{address?.fullName}</p>
                      <p className="text-sm text-gray-600">{address?.street}, {address?.city} — {address?.pincode}</p>
                      <p className="text-sm text-gray-600">📞 {address?.phone}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Delivery Slot</p>
                      <p className="text-sm text-gray-900 font-medium">{selectedDate && new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                      <p className="text-sm text-gray-600">⏰ {selectedSlot}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Payment</p>
                      <p className="text-sm text-gray-900 font-medium">💵 Cash on Delivery</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(3)} className="btn-secondary flex items-center gap-2">
                      <ChevronLeft size={18} /> Back
                    </button>
                    <button
                      onClick={placeOrder}
                      disabled={placing}
                      className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {placing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Placing Order...
                        </>
                      ) : (
                        <>Place Order · {formatCurrency(total())}</>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar: Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 sticky top-28">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-green-pale flex items-center justify-center text-lg shrink-0">🥛</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.volume} × {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(total())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="text-brand-green font-semibold">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-brand-green">{formatCurrency(total())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
