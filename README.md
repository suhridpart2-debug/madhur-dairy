# 🥛 Madhur Dairy — Full-Stack D2C Platform

> Pure. Fresh. Delivered.

A complete production-ready Next.js 14 e-commerce platform for Madhur Dairy — featuring Google Auth, MongoDB, Telegram notifications, auto-invoice email, admin dashboard, and AI support chat.

---

## ⚡ Quick Start

```bash
# 1. Clone and install
git clone https://github.com/yourusername/madhur-dairy.git
cd madhur-dairy
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in all values in .env.local

# 3. Seed the database with products
npx tsx scripts/seed.ts

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Required Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | How to get it |
|---|---|
| `NEXTAUTH_SECRET` | Run: `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Google Cloud Console → APIs → Credentials |
| `GOOGLE_CLIENT_SECRET` | Same as above |
| `MONGODB_URI` | MongoDB Atlas → Connect → Driver |
| `TELEGRAM_BOT_TOKEN` | Message @BotFather → /newbot |
| `TELEGRAM_CHAT_ID` | Send msg to bot → call getUpdates API |
| `GMAIL_USER` | Your Gmail address |
| `GMAIL_APP_PASSWORD` | Google Account → Security → App Passwords |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary dashboard |
| `ANTHROPIC_API_KEY` | console.anthropic.com |
| `ADMIN_EMAIL` | Your Google account email (gets admin role) |

---

## 🚀 Deployment

### Vercel (Frontend + API)
1. Push to GitHub
2. Import repo at vercel.com
3. Add all environment variables in Vercel dashboard
4. Deploy — it auto-detects Next.js

### MongoDB Atlas (Database)
1. Create free M0 cluster at mongodb.com/atlas
2. Create DB user, whitelist IP `0.0.0.0/0`
3. Copy connection string to `MONGODB_URI`

### Telegram Bot Setup
1. Message @BotFather on Telegram → `/newbot`
2. Follow prompts, copy the token
3. Send any message to your bot
4. Visit: `https://api.telegram.org/bot<TOKEN>/getUpdates`
5. Find `"chat":{"id":XXXXXXX}` — that's your Chat ID

### Gmail App Password
1. Enable 2-factor auth on your Google account
2. Go to: myaccount.google.com → Security → App Passwords
3. Generate for "Mail" → copy the 16-character password

---

## 📁 Project Structure

```
madhur/
├── app/                    # Next.js App Router
│   ├── (customer)/         # Customer-facing pages
│   ├── admin/              # Admin dashboard
│   ├── api/                # REST API endpoints
│   └── auth/               # Authentication pages
├── components/             # React components
│   ├── ai/                 # AI chat widget
│   ├── cart/               # Cart drawer
│   ├── layout/             # Navbar, Footer
│   ├── product/            # Product cards
│   └── sections/           # Page sections
├── lib/                    # Utilities, auth config, DB
├── models/                 # Mongoose schemas
├── services/               # Business logic services
├── store/                  # Zustand state
├── templates/              # Email templates
└── scripts/                # Seed scripts
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Database | MongoDB Atlas + Mongoose |
| Auth | NextAuth.js + Google OAuth |
| Notifications | Telegram Bot API |
| Email | Nodemailer + Gmail |
| Images | Cloudinary |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| AI | Anthropic Claude API |
| Hosting | Vercel |

---

## 🤖 AI Features

- **Support Chat Widget** — Claude-powered FAQ bot for customers
- **Admin AI Insights** — Sales trends and demand hints in dashboard
- **Reorder Suggestions** — Smart banner for returning customers

---

## 📱 Telegram Notifications

Every new order sends an instant formatted message to your Telegram:

```
🛒 New Order — MDR-2024-00042

👤 Customer: Priya Sharma
📞 Phone: 98765 43210
📦 Items:
  • Madhur Taak (500ml) × 2 — ₹70
  • Madhur Lassi (200ml) × 1 — ₹25
💰 Total: ₹95
💳 Payment: COD — PENDING
📍 Address: 42, Baner Road, Pune - 411045
🚚 Delivery: Morning 7–10 AM
📅 Date: 15 Jan 2024
```

---

## 🌱 Seed Products

Run `npx tsx scripts/seed.ts` to populate:
- 3 variants of Madhur Taak (200ml, 500ml, 1L)
- 3 Lassi products (Sweet 200ml/500ml, Mango 500ml)
- 3 Flavoured Milks (Chocolate, Strawberry, Rose)

---

## 📊 Admin Dashboard

Access at `/admin` (requires admin role):
- **Orders** — View, filter, update status
- **Products** — Full CRUD management
- **Customers** — List with order stats
- **Analytics** — Revenue, top products, peak hours
- **Invoices** — Email logs, resend invoices
- **Notifications** — Telegram delivery logs

---

Made with 🥛 for Madhur Dairy, Pune.
