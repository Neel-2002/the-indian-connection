# Kaarya — Premium Concierge Platform
### Product & Brand Strategy Document
*Prepared in the manner of a top-tier product consultancy. Version 1.0*

---

## 0. Executive Summary

**Kaarya** (Sanskrit: *कार्य* — "the thing to be done / accomplished") is a premium human-led concierge platform for Indians who have the means but not the time, knowledge, or confidence to navigate complex travel and reservation logistics.

We do not sell tickets. We sell **certainty, time, and status**. A user tells us what they want in a guided, conversational interview; a human concierge returns a curated, transparent quotation. The promise is one line: **"You ask. We arrange. You travel."**

The market gap: India's travel-tech is saturated with self-service OTAs (MakeMyTrip, Cleartrip, IRCTC) that push effort *onto* the customer. Nobody owns the "done-for-you" premium tier at scale. Amex Platinum concierge exists only for cardholders; offline travel agents lack a trustworthy digital surface. Kaarya occupies that whitespace.

| | |
|---|---|
| **Category** | Done-for-you travel concierge (lead-gen → quotation → fulfilment) |
| **Model** | Service fee per request + membership tiers + corporate retainers |
| **Wedge** | Tatkal & last-minute high-stress bookings (urgent, painful, recurring) |
| **Moat (long-term)** | Trust, concierge relationships, request data, response speed |
| **Target scale** | 100,000+ users, premium experience preserved |

---

## 1. Brand Strategy

### 1.1 Company Name Suggestions
Primary recommendation in **bold**.

| Name | Meaning / Rationale | Notes |
|------|--------------------|-------|
| **Kaarya** | "The task, accomplished." Sanskrit gravitas, modern sound, .com viable, trademark-friendly. | **Recommended** |
| Saath | "Companionship / by your side." Warm, trust-led. | Strong alt |
| Sahaayak | "The helper." Clear but slightly utilitarian. | Functional |
| Mukti | "Freedom (from hassle)." Aspirational. | Premium feel |
| Concierge Co. / The Arrangers | English, descriptive, globally legible for NRIs. | Safe, less distinctive |
| Vyana | Sanskrit for the "circulating" life-force — movement. | Abstract, ownable |

**Why Kaarya:** It's short, phonetically clean across Indian languages and for NRIs, carries quiet authority (not flashy), and the meaning *is* the value proposition — the task, done.

### 1.2 Premium Taglines
- **"You ask. We arrange. You travel."** *(primary — verb-led, calm, complete)*
- "The concierge India was waiting for."
- "Your time, handled."
- "Travel, without the work."
- "We handle everything. You simply go."

### 1.3 Brand Positioning
> **For** discerning Indians and NRIs who value their time, **Kaarya is** a human concierge service **that** arranges any travel or reservation request end-to-end, **unlike** self-service booking portals **because** we do the work, absorb the complexity, and stake our reputation on every quotation.

**Positioning axes:**
- *Effort:* Done-for-you (not DIY)
- *Trust:* Human, accountable, named concierge (not anonymous app)
- *Tier:* Premium-accessible (not mass-market, not ultra-exclusive)

### 1.4 Brand Story
> Most travel apps were built for the traveller who enjoys the hunt — comparing fares at midnight, refreshing Tatkal at 10:00:01, decoding visa checklists. But for a surgeon between shifts, a founder mid-quarter, a son booking his parents' Char Dham yatra from Dubai, or a 68-year-old who simply finds the apps bewildering — that hunt is not a feature. It's a tax on their time and peace of mind.
>
> Kaarya removes that tax. Tell us what you need in a short, guided conversation. A real concierge — not a chatbot — reviews it, does the legwork, and returns one clear quotation with our fee shown openly. You approve. We execute. You receive your confirmations.
>
> No comparison fatigue. No hidden charges. No "sorry, sold out" at the finish line. Just the quiet confidence that it's handled.

### 1.5 Value Proposition
**Core:** *We convert your intent into confirmed travel — completely, transparently, and on time.*

| Pillar | Customer gain |
|--------|--------------|
| **Time** | Minutes of conversation replace hours of research and booking. |
| **Certainty** | Specialists who know Tatkal timing, visa nuances, and inventory tricks. |
| **Transparency** | Service fee shown upfront in every quotation. No surprises. |
| **Trust** | A named human concierge is accountable for your request. |
| **Access** | VIP reservations, last-minute fixes, and arrangements ordinary users can't get. |

---

## 2. Complete Website Sitemap

```
Kaarya
│
├── Homepage (/)
│   └── Interactive Requirement Builder (primary conversion surface)
│
├── Services (/services)
│   ├── Tatkal & Train (/services/train)
│   ├── Flights (/services/flights)
│   ├── Hotels (/services/hotels)
│   ├── Holiday Packages (/services/holidays)
│   ├── Visa Assistance (/services/visa)
│   ├── Pilgrimage Planning (/services/pilgrimage)
│   ├── Luxury Travel (/services/luxury)
│   ├── Corporate Travel (/services/corporate)
│   └── More (Bus, Events, Airport Transfers, Honeymoon, Group, VIP)
│
├── How It Works (/how-it-works)
├── Why Choose Us (/why-us)
├── Success Stories (/stories)
├── Pricing (/pricing)
├── For Corporates (/corporate)        ← dedicated B2B landing
├── Membership (/membership)            ← Kaarya Club tiers
├── FAQ (/faq)
├── Contact (/contact)
├── Trust & Safety (/trust)             ← refunds, data, accountability
│
├── Auth (/login, /signup, /verify)
│
├── User Dashboard (/dashboard)
│   ├── My Requests (/dashboard/requests)
│   ├── Quotations (/dashboard/quotations)
│   ├── Bookings & Documents (/dashboard/bookings)
│   ├── Payments (/dashboard/payments)
│   ├── Travellers (saved profiles) (/dashboard/travellers)
│   └── Messages (concierge chat) (/dashboard/messages)
│
└── Admin Panel (/admin)
    ├── Lead Dashboard (/admin/leads)
    ├── Quotation Builder (/admin/quotations)
    ├── Customers / CRM (/admin/customers)
    ├── Revenue Analytics (/admin/analytics)
    ├── Service & Pricing Management (/admin/services)
    ├── Concierge Workload (/admin/team)
    └── Settings & Roles (/admin/settings)
```

---

## 3. Homepage Wireframe (section by section)

```
┌──────────────────────────────────────────────────────────┐
│ NAVBAR (floating, glass)                                    │
│ Kaarya          Services  How it works  Stories  [Sign in] │
│                                          [Start a request] │
├──────────────────────────────────────────────────────────┤
│ HERO                                                        │
│   Eyebrow: A HUMAN CONCIERGE FOR INDIAN TRAVEL             │
│   H1 (Cormorant): "You ask. We arrange. You travel."      │
│   Sub: One conversation. A real concierge handles the rest.│
│   [ Tell us what you need → ]   [ How it works ]          │
│   trust row: ★4.9 · 12,000+ requests · avg quote in 90 min │
│   RIGHT: live "request → quotation" animated card          │
├──────────────────────────────────────────────────────────┤
│ INTERACTIVE REQUIREMENT BUILDER  ◀ centerpiece            │
│   Step 1: "What can we help you with today?" (service grid)│
│   Step 2: dynamic concierge-interview questions            │
│   Step 3: contact + review summary                         │
│   Step 4: confirmation ("A concierge is on it")           │
│   progress rail + reassurance microcopy ("No payment now")│
├──────────────────────────────────────────────────────────┤
│ TRUST INDICATORS (logos, stats, security badges)          │
│   12k requests · ₹X arranged · 4.9★ · data-secure · RBI   │
├──────────────────────────────────────────────────────────┤
│ CONCIERGE PROCESS (4 steps, numbered — real sequence)     │
│   01 Share  →  02 We curate  →  03 You approve  → 04 Travel │
├──────────────────────────────────────────────────────────┤
│ SERVICES SHOWCASE (bento grid of service categories)      │
├──────────────────────────────────────────────────────────┤
│ BENEFITS / WHY KAARYA (time, transparency, access, trust) │
├──────────────────────────────────────────────────────────┤
│ TESTIMONIALS (carousel: photo + name + role + city)       │
├──────────────────────────────────────────────────────────┤
│ FINAL CTA (emerald band)                                   │
│   "Tell us where you want to go."  [ Start a request → ]  │
├──────────────────────────────────────────────────────────┤
│ FOOTER (services, company, trust, contact, languages)     │
└──────────────────────────────────────────────────────────┘
```

**Section intent notes**
- **Hero** opens with the *most characteristic thing in our world* — the transformation of a messy request into a clean quotation — shown as a live animated card, not a stock travel photo.
- **The builder is placed immediately below the hero** (not behind a click) because the entire business is lead capture. Friction kills it.
- **Numbered process (01–04)** is justified — it *is* a real sequence the user moves through, so numbering encodes truth, not decoration.

---

## 4. Complete UX Flows

### 4.1 New Visitor (cold, mobile, skeptical)
1. Lands on hero → reads one-line promise → scrolls 1 screen.
2. Sees builder already open at Step 1 → curiosity, low commitment ("just picking a service").
3. Selects **Train / Tatkal** → 6–8 friendly questions, progress bar shows "almost done."
4. At contact step: only **name + phone/WhatsApp** required (email optional). Reassurance: *"No payment now. A concierge reviews your request and sends a quote."*
5. Submits → confirmation screen with **expected quote time (e.g., 90 min)** + WhatsApp deep-link + "Track your request."
6. Receives WhatsApp confirmation instantly (automated) → builds trust before human reply.

**Drop-off defenses:** builder is the first interactive element; phone-first (not email); progress + "1 of 3"; no login wall before submission (account created silently from phone).

### 4.2 Returning User (warm, logged in)
1. Recognized by phone/cookie → hero CTA becomes **"Start a new request"** + "Welcome back, Aarav."
2. Dashboard shortcut in nav. Saved travellers and past routes **pre-fill** the builder.
3. New request inherits previous preferences (class, budget band, meal/seat). 3 taps to submit.
4. Quotation lands in dashboard + WhatsApp; one-tap **Approve & Pay**.

### 4.3 Corporate Client (B2B, high LTV)
1. Enters via **/corporate** (separate landing, ROI + compliance framing).
2. "Book a 15-min walkthrough" → calendar; or "Create company account."
3. Admin invites travellers, sets **policy** (cabin caps, approval chains, cost centres).
4. Employees raise requests; manager approves; Kaarya concierge fulfils; **monthly consolidated invoice + GST**.
5. Dashboard: spend analytics, top routes, savings vs. retail, downloadable reports.

### 4.4 Senior Citizen (accessibility-first)
1. Larger default type, high-contrast emerald/ivory, generous touch targets (≥48px).
2. Builder uses **plain language** ("Where are you starting from?" not "Source station").
3. Prominent **"Prefer to talk? Call us"** + WhatsApp at every step.
4. Optional **"Help me fill this"** → callback request instead of completing the form.
5. Confirmation in simple terms + SMS (not only email). Family member can be added as contact.

---

## 5. UI Design System

> Direction: **Heritage Luxury** — Ivory + Deep Emerald + Brass. Warm, trustworthy, distinctly Indian-premium, accessible to seniors. Restraint everywhere; boldness spent on one signature element (the request→quote transformation).

### 5.1 Color Tokens
| Token | Hex | Use |
|-------|-----|-----|
| `--ivory` (bg) | `#FBF8F1` | Page background, warmth |
| `--emerald-900` (primary) | `#0C3A2C` | Headers, dark bands, primary surfaces |
| `--emerald-700` | `#155241` | Buttons, links, accents |
| `--emerald-50` | `#EAF1ED` | Soft tints, hover fills |
| `--brass` (accent/CTA) | `#B0894F` | Gold accent, dividers, premium cues |
| `--brass-soft` | `#D9C29B` | Subtle highlights |
| `--ink` (text) | `#1C1A15` | Body text (contrast ≥ 12:1 on ivory) |
| `--muted` | `#5C5950` | Secondary text (≥ 4.5:1) |
| `--line` | `#E4DDCF` | Borders, hairlines |
| `--success` | `#1E7A52` / `--error` | `#B23B3B` | States |

*Contrast verified: ink-on-ivory and ivory-on-emerald both exceed WCAG AA.*

### 5.2 Typography
- **Display:** `Cormorant` (600/700) — elegant, editorial, used **large and sparingly** for H1/H2 and pull-quotes only.
- **Body & UI:** `Montserrat` (300–600) — clean, legible, modern; all paragraphs, labels, buttons.
- **Numeric/data:** Montserrat tabular for stats and the quotation.
- Scale (clamp, fluid): H1 ~clamp(2.75rem,6vw,4.5rem) · H2 ~2.25rem · H3 ~1.5rem · body 1.0625rem (17px, ≥16px mobile) · small 0.875rem.
- Line-height: 1.6 body, 1.1 display. Line length capped ~68ch.

### 5.3 Buttons
- **Primary:** emerald-700 fill, ivory text, brass focus ring; hover → emerald-900 (color shift, **no scale**); 150–250ms.
- **Secondary:** transparent, emerald border, emerald text; hover → emerald-50 fill.
- **Ghost/text:** emerald text + animated underline.
- All ≥ 48px height, `cursor-pointer`, visible focus, disabled+spinner on async.

### 5.4 Cards
- Ivory surface, 1px `--line` border, soft shadow (`0 10px 30px -18px rgba(12,58,44,.25)`), 16–20px radius.
- **Signature card:** the live "request → quotation" transformer in the hero (subtle glass + brass edge).
- Service cards: icon (Lucide SVG, never emoji), title, one-line value, hover lifts shadow + brass top-border reveal.

### 5.5 Animations (deliberate, reduced-motion respected)
- Hero quote-card: one **orchestrated** sequence on load (form lines resolve into a clean quotation). This is the one bold moment.
- Builder step transitions: 250ms fade+slide, directional.
- Micro: button hover color, card shadow lift, progress fill.
- Everything gated behind `prefers-reduced-motion`.

### 5.6 Modern UI elements
- Light, restrained **glass** on the floating navbar and hero card only (per skill: glass sparingly — it's "Liquid Glass" used with discipline, not everywhere).
- Brass **hairline dividers** as a recurring heritage motif.
- Bento grid for services.

### 5.7 Premium references
Aman / Taj Hotels (restraint + warmth), Amex Platinum (concierge authority), Airbnb (trust patterns), Linear (interaction polish), Forest Essentials (Indian-luxury palette).

---

## 6. Feature List

### 6.1 MVP (launch)
- **Requirement Builder** — multi-step, service-aware dynamic questions, save-on-submit, no login wall.
- **Lead Management** — every submission becomes a structured lead with status pipeline.
- **Quotation System** — concierge builds itemized quote (base cost + service fee shown), sends to user.
- **Notifications** — instant WhatsApp + SMS + email on submit, on quote, on approval.
- **WhatsApp integration** — primary channel; deep-link from confirmation; two-way concierge chat.
- **Basic auth** — phone-OTP, silent account creation.
- **User dashboard (lite)** — requests, quotations, approve button.
- **Admin (lite)** — lead inbox, quote builder, status updates.

### 6.2 Advanced (scale)
- **AI Concierge Assistant** — drafts quotations for concierge to approve; answers FAQs; classifies/prioritizes leads; suggests upsells.
- **Dynamic Price Intelligence** — fare/inventory monitoring, "best time to book," margin optimization.
- **Travel Recommendations** — personalized destinations, packages, re-engagement ("Char Dham season is open").
- **CRM** — full customer 360, LTV, segments, lifecycle campaigns.
- **Payment Collection** — Razorpay/UPI, partial deposits, GST invoicing, refunds.
- **Booking Tracking** — live status, document vault (tickets, visas, vouchers), PNR sync.
- **Membership engine** — Kaarya Club tiers, perks, priority routing.
- **Corporate suite** — policy engine, approval chains, consolidated billing, analytics.
- **Multilingual** — Hindi + regional + English for NRIs.

---

## 7. Admin Panel

### 7.1 Lead Dashboard
- Kanban + table views: **New → Reviewing → Quoted → Approved → Booked → Closed/Lost**.
- Each lead card: service, route, urgency (Tatkal/last-minute flag), SLA timer, assigned concierge, value estimate.
- Filters: service, city, urgency, value, source, concierge. Bulk assign.
- **SLA alerts** — red when quote time at risk (protects the "90-min" promise).

### 7.2 Quotation Management
- Quote builder: line items (base cost, taxes, **service fee**, optional add-ons), templates per service, margin view (internal only), one-click send via WhatsApp/email, version history, accept/expire tracking.

### 7.3 Customer Tracking (CRM)
- Profile 360: contact, saved travellers, request history, LTV, preferred channel, membership tier, notes, sentiment.

### 7.4 Revenue Analytics
- KPIs: requests, **quote→approval conversion**, avg service fee, GMV, net revenue, avg response time, repeat rate, revenue by service/city, concierge leaderboard, cohort retention.
- Charts (per skill chart-domain): line (revenue trend), funnel (lead→booked), bar (revenue by service), with accessible palettes + data-table fallback.

### 7.5 Service & Pricing Management
- CRUD services, configure **dynamic question sets** per service (no-code form builder), default fee rules (flat / % / tiered), SLA per service, enable/disable, seasonal toggles (e.g., Char Dham).

### 7.6 Team / Workload
- Concierge capacity, round-robin/skill-based routing, performance, shift coverage.

---

## 8. Technical Architecture

```
                         ┌────────────────────────────┐
   Browser / PWA  ─────▶ │  Next.js 14 (App Router)    │  ── Vercel Edge/CDN
   (users, admin)        │  TypeScript + TailwindCSS   │
                         │  Server Actions + RSC       │
                         └──────────────┬─────────────┘
                                        │  REST/tRPC
                         ┌──────────────▼─────────────┐
                         │  API: Node (NestJS) or       │
                         │  FastAPI (Python)            │  ── AWS ECS/Fargate
                         │  Auth, leads, quotes, billing│
                         └───┬──────────┬──────────┬───┘
                             │          │          │
            ┌────────────────▼──┐  ┌────▼─────┐  ┌─▼──────────────┐
            │ PostgreSQL (RDS)   │  │ Redis     │  │ S3 (documents) │
            │ leads, quotes, CRM │  │ cache,    │  │ tickets/visas  │
            └────────────────────┘  │ queues    │  └────────────────┘
                                     └────┬──────┘
                              jobs/notifications
              ┌──────────────┬───────────┼─────────────┬───────────┐
        Resend (email)  Meta WhatsApp  MSG91 (SMS/OTP) Razorpay  OpenAI/Claude
                                                        (payments) (AI assist)
   Auth: Clerk (phone OTP, B2B orgs)   Observability: Sentry + PostHog + Grafana
```

**Recommendations & rationale**
- **Frontend:** Next.js 14 (App Router) + TS + Tailwind — SEO for marketing pages (RSC/SSG), fast, one codebase for site + dashboards. Host on **Vercel**.
- **Backend:** **NestJS (Node/TS)** recommended over FastAPI for a single-language stack and easier hiring in India; choose FastAPI only if the AI/data team is Python-first.
- **DB:** **PostgreSQL (AWS RDS)**, Prisma ORM. Redis for queues/cache.
- **Auth:** **Clerk** — phone-OTP out of the box, B2B "Organizations" for corporate, low effort vs Auth0.
- **Email:** Resend. **SMS/OTP:** MSG91 (India deliverability). **WhatsApp:** Meta Cloud API (+ BSP like Gupshup/AiSensy for templates).
- **Payments:** Razorpay (UPI/cards/GST invoicing).
- **AI:** Claude/OpenAI for quote drafting, lead triage, FAQ.
- **Infra:** Vercel (web) + AWS (API, RDS, S3); IaC via Terraform; CI/CD GitHub Actions.
- **Scale to 100k+:** stateless API behind ALB + autoscaling, read replicas, Redis queues for WhatsApp/notifications, CDN for static, partition leads by status, feature-flag rollout.

---

## 9. Conversion Optimization

**Maximize lead generation**
- Builder is the hero-adjacent first interaction; **no login before submit**; phone-first.
- Service grid lowers commitment ("just pick one"); progress bar creates completion drive.
- Multiple entry CTAs all route to the same builder; sticky mobile CTA bar.

**Reduce drop-offs**
- Ask the **minimum** at each step; defer optional fields; one question-group per screen on mobile.
- Persist partial answers (resume later); auto-save to localStorage.
- Reassurance microcopy: "No payment now," "Free quote," "Reply in ~90 min."
- Senior-friendly "Prefer to talk? Call us" escape hatch reframes abandonment as a callback.

**Increase quotation acceptance**
- **Transparent fee** (no hidden charges → trust).
- Fast SLA (speed correlates with acceptance); WhatsApp delivery (90%+ open rate).
- Quote shows value framing (time saved, what we handled), expiry urgency, one-tap approve+pay, concierge name + photo.

**Build trust**
- Real testimonials (photo/name/role/city), verifiable stats, security/data badges, named accountable concierge, transparent pricing page, refund/Trust & Safety page, response-time guarantee.

---

## 10. Revenue Model

### 10.1 Service Fee Structure
| Tier | Fee logic | Example |
|------|-----------|---------|
| Standard requests (train/bus) | Flat fee | ₹149–₹399 per booking |
| Mid (flights/hotels) | % of value, floor | 4–8%, min ₹499 |
| Complex (visa, packages, luxury) | Value-based / quoted | ₹1,500–₹25,000+ |
| Urgent (Tatkal, last-minute) | Premium surcharge | +30–50% on base fee |

Fee always shown line-item in the quotation (transparency = differentiation).

### 10.2 Subscription / Membership — "Kaarya Club"
| Tier | Price (illustrative) | Perks |
|------|----------------------|-------|
| **Free** | ₹0 | Standard fees, standard SLA |
| **Silver** | ₹999/yr | 10% off fees, priority queue |
| **Gold** | ₹4,999/yr | 25% off, dedicated concierge, faster SLA, lounge perks |
| **Platinum** | ₹24,999/yr | Flat/zero fee on most, 24×7 concierge, VIP access, lifestyle requests |

### 10.3 Corporate Packages
- **Retainer** (monthly minimum + reduced per-booking fee), **policy + consolidated GST invoicing**, dedicated account manager, SLA guarantees, analytics. Pricing by travel volume.

### 10.4 Premium Membership / Lifestyle (future)
- Beyond travel: restaurant/event/VIP reservations, lifestyle errands → highest-margin Platinum upsell, path to "luxury lifestyle concierge."

**Unit-economics logic:** wedge on high-frequency low-fee (Tatkal) to acquire trust + data → expand to high-margin complex + memberships → corporate retainers for predictable MRR.

---

## 11. Future Scale Plan

**Phase 1 — Wedge (0–12 mo): Trusted travel concierge**
Win Tatkal/last-minute + flights/hotels in metros. Prove SLA + acceptance. Build review moat.

**Phase 2 — Nationwide Concierge Brand (12–24 mo)**
Regional languages, tier-2/3 expansion, pilgrimage & group-tour seasonal engines, memberships live, brand = "the people who handle it."

**Phase 3 — Travel Management Platform (24–36 mo)**
Corporate suite at scale (policy, approvals, billing, analytics) → recurring B2B MRR; supplier/partner network; document vault + booking OS.

**Phase 4 — AI Travel Assistant (36–48 mo)**
AI drafts most quotations instantly (human approves), predicts needs, proactive re-engagement; concierge time shifts to high-value/complex. Margin and scale unlock together.

**Phase 5 — Luxury Lifestyle Concierge (48 mo+)**
Beyond travel: dining, events, VIP access, lifestyle errands. Platinum members get an Amex-grade "anything, handled" service. Kaarya becomes a **lifestyle operating system** for affluent India and the diaspora.

```
Tatkal wedge → National travel concierge → Corporate platform
        → AI-augmented scale → Luxury lifestyle concierge
   (trust + data compounding at every step)
```

---

*End of strategy document. Companion: a live Next.js homepage with a fully interactive multi-step requirement builder implementing Sections 3, 4, and 5.*
