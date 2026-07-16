<div align="center">

<img src="public/logo-mark.png" width="130" alt="The Indian Connection logo" />

# The Indian Connection

### ✨ Redefining Bookings ✨

**You ask. We arrange. You travel.**

A premium **human-concierge** travel platform for India — for people who have the means but not the time, knowledge, or patience to wrestle with booking portals. Tell us what you need in one guided conversation; a real concierge reviews it and sends a transparent quotation.

<br/>

![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?logo=clerk&logoColor=white)
![Resend](https://img.shields.io/badge/Email-Resend-000000?logo=resend&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

</div>

---

## 🧭 What is this?

India's travel-tech is full of self-service portals (IRCTC, OTAs) that push all the effort onto **you** — comparing fares at midnight, refreshing Tatkal at 10:00:01, decoding visa checklists. **The Indian Connection** removes that tax.

Instead of selling tickets, we sell **certainty, time, and status**:

1. 🗣️ **You share** what you need through a short, guided interview — no long forms.
2. 🧑‍💼 **A concierge curates** and sends a clear, itemised quotation (service fee shown openly).
3. ✅ **You approve** and pay securely.
4. ✈️ **You travel** — we deliver your tickets, vouchers and documents.

Built for working professionals, business owners, senior citizens, families, and NRIs.

---

## 🌟 Features

| | Feature |
|---|---|
| 🎫 | **Interactive requirement builder** — a multi-step, service-aware "concierge interview" (Train & Tatkal, Flights, Hotels, Holidays, Visa, Pilgrimage, Luxury, Corporate & more) with dynamic questions per service |
| 🔐 | **Real authentication** via **Clerk** (Google / Apple / email) — sign-in required to submit a request, enforced on both the UI and the API |
| 📊 | **"My requests" dashboard** — signed-in users see their past requests, saved to their account |
| 🌐 | **6-language support** — English, हिन्दी, বাংলা, தமிழ், తెలుగు, मराठी — with an instant, no-reload switcher |
| 💬 | **Assistant chatbot** — answers common queries and hands a chosen service straight into the request form |
| 📍 | **Indian city & town autocomplete** — live search across towns and villages (OpenStreetMap), with an offline fallback list |
| 📧 | **Email notifications** via **Resend** — every request emails the concierge team |
| 🟢 | **WhatsApp click-to-chat** — one tap to continue a request on WhatsApp |
| ⭐ | **"Share your story"** — visitors can submit a testimonial with a star rating |
| 🎨 | **Heritage design system** — maroon + navy + saffron palette, Cinzel + Montserrat type, circular brand logo & favicon |
| 🪄 | **Alive, tasteful motion** — ambient drifting background, on-scroll reveals, a scroll-progress bar, and button micro-interactions |
| ♿ | **Accessible & responsive** — keyboard focus rings, `prefers-reduced-motion` respected, works from 375px to desktop |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Actions, API routes)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + a custom heritage theme
- **Auth:** [Clerk](https://clerk.com/)
- **Email:** [Resend](https://resend.com/)
- **Geocoding:** [Photon / OpenStreetMap](https://photon.komoot.io/) (keyless)
- **Icons:** [Lucide](https://lucide.dev/)
- **Fonts:** [Cinzel](https://fonts.google.com/specimen/Cinzel) (display) + [Montserrat](https://fonts.google.com/specimen/Montserrat) (body)
- **Hosting:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+**
- Free accounts for [Clerk](https://dashboard.clerk.com) and [Resend](https://resend.com) (for auth + email)

### 1. Install

```bash
git clone https://github.com/Neel-2002/the-indian-connection.git
cd the-indian-connection
npm install
```

### 2. Configure environment

Copy the example and fill in your keys:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Your Resend API key (`re_…`) |
| `LEAD_INBOX` | Email address that receives new requests |
| `LEAD_FROM` | Sender, e.g. `The Indian Connection <requests@yourdomain.com>` (uses `onboarding@resend.dev` until you verify a domain) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (`pk_…`) |
| `CLERK_SECRET_KEY` | Clerk secret key (`sk_…`) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | `/` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | `/` |

### 3. Run

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** 🎉

---

## 📜 Scripts

| Command | Does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the codebase |

---

## 📁 Project Structure

```
concierge-platform/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout (providers, fonts, favicon)
│   ├── dashboard/               # "My requests" (auth-protected)
│   ├── sign-in/ · sign-up/      # Clerk auth pages
│   └── api/
│       ├── requests/            # Request submission + email + save to account
│       └── stories/             # Testimonial submissions
├── components/                  # Hero, RequirementBuilder, ChatBot, Navbar, Sections…
├── lib/
│   ├── services.ts              # Service definitions & question sets
│   ├── i18n.ts                  # Translations (6 languages)
│   └── cities.ts                # Offline Indian-city fallback list
├── middleware.ts                # Clerk middleware (protects /dashboard)
└── public/                      # Logo, favicon, intro video
```

---

## ☁️ Deployment

Deployed on **Vercel** — every push to `main` auto-deploys.

1. Import the repo at [vercel.com](https://vercel.com) (auto-detects Next.js).
2. Add the environment variables above under **Settings → Environment Variables (Production)**.
3. Deploy. 🚀

> 💡 **Email in production:** to send confirmations to real customer addresses, verify a domain in Resend and point `LEAD_FROM` at it.

---

## 🗺️ Roadmap

- [ ] Customer confirmation emails (once a sender domain is verified)
- [ ] Clickable request details & status tracking in the dashboard
- [ ] Admin panel — lead management, quotation builder, analytics
- [ ] Payments (Razorpay / UPI) & booking document vault
- [ ] Corporate travel suite (policies, approvals, consolidated billing)

---

<div align="center">

Made with ❤️ in India · Available in English & many Indian languages

**The Indian Connection — Redefining Bookings**

</div>
