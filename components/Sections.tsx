"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Clock,
  Lock,
  BadgeCheck,
  MessageSquare,
  FileText,
  CheckCircle2,
  Plane,
  Star,
  UserCheck,
  Eye,
  Sparkles,
  Plus,
  X,
  Loader2,
  Check,
  ArrowRight,
} from "lucide-react";
import { services } from "@/lib/services";
import { useLanguage } from "@/components/LanguageProvider";

interface Story {
  quote: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
  pending?: boolean;
}

/* ---------------- Builder intro (used on the homepage) ---------------- */
export function BuilderIntro() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <span className="ornament text-xs font-semibold uppercase tracking-[0.2em]">
        {t("Start here")}
      </span>
      <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-maroon-900 sm:text-5xl">
        {t("Begin your concierge request")}
      </h2>
    </div>
  );
}

/* ---------------- Trust indicators ---------------- */
export function TrustBar() {
  const { t } = useLanguage();
  const items = [
    { icon: Sparkles, title: "Now in beta", sub: "Newly launched in India" },
    { icon: UserCheck, title: "Human concierge", sub: "Real people, not a bot" },
    { icon: Eye, title: "Transparent fees", sub: "Shown upfront, always" },
    { icon: Clock, title: "Fast quotes", sub: "Reply in ~90 minutes" },
  ];
  return (
    <section className="border-y border-line bg-white/50 px-4 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
        {items.map((s) => (
          <div key={s.title} className="text-center">
            <s.icon className="mx-auto h-6 w-6 text-saffron" strokeWidth={1.5} />
            <p className="mt-2 font-display text-2xl font-semibold text-maroon-900">
              {t(s.title)}
            </p>
            <p className="text-sm text-muted">{t(s.sub)}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted">
        <span className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-navy-700" strokeWidth={1.75} /> {t("Bank-grade data security")}
        </span>
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-navy-700" strokeWidth={1.75} /> {t("Transparent, upfront fees")}
        </span>
        <span className="flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-navy-700" strokeWidth={1.75} /> {t("Named, accountable concierge")}
        </span>
      </div>
    </section>
  );
}

/* ---------------- Concierge process (numbered — real sequence) ---------------- */
export function Process() {
  const steps = [
    { n: "01", icon: MessageSquare, title: "Share your request", body: "Tell us what you need in a short, guided conversation. No long forms, no payment." },
    { n: "02", icon: FileText, title: "We curate & quote", body: "A real concierge does the legwork and sends a clear, itemised quotation — service fee shown openly." },
    { n: "03", icon: CheckCircle2, title: "You approve", body: "Happy with it? Approve in one tap and pay securely. Changes? Just tell us." },
    { n: "04", icon: Plane, title: "You travel", body: "We confirm everything and deliver your tickets, vouchers and documents. You simply go." },
  ];
  const { t } = useLanguage();
  return (
    <section id="process" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps. We do the work."
          subtitle="A premium concierge interview — not a booking form. Here's exactly what happens."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="group relative rounded-3xl border border-line bg-white p-6 transition-shadow duration-300 hover:shadow-card"
            >
              <span className="font-display text-5xl font-semibold text-saffron/35">
                {s.n}
              </span>
              <s.icon className="mt-3 h-7 w-7 text-navy-700" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-2xl font-semibold text-maroon-900">
                {t(s.title)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(s.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Video showcase ---------------- */
export function VideoShowcase() {
  return (
    <section id="video" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Watch"
          title="See The Indian Connection in action."
          subtitle="A short look at how we turn a simple request into a confirmed, worry-free journey."
        />
        <div className="relative mt-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem]"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 50%, rgba(0,39,102,0.14), transparent 70%), radial-gradient(40% 50% at 80% 20%, rgba(194,78,18,0.12), transparent 70%)",
            }}
          />
          <div className="overflow-hidden rounded-3xl border border-saffron/30 bg-navy-900 p-2 shadow-lift sm:p-3">
            <video
              className="aspect-video w-full rounded-2xl bg-navy-900"
              controls
              preload="metadata"
              playsInline
            >
              <source src="/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services bento ---------------- */
export function Services() {
  const { t } = useLanguage();
  return (
    <section id="services" className="bg-white/50 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What we handle"
          title="Almost anything you'd ask a travel advisor."
          subtitle="From a single Tatkal berth to a fully curated honeymoon — one place, one concierge."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <a
              key={s.id}
              href="#builder"
              className="group flex cursor-pointer flex-col rounded-3xl border border-line bg-ivory p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-saffron hover:shadow-card"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-ivory transition-colors duration-300 group-hover:bg-maroon-700">
                <s.icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-maroon-900">
                {t(s.name)}
              </h3>
              <p className="mt-1 text-sm text-muted">{t(s.tagline)}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Benefits ---------------- */
export function Benefits() {
  const items = [
    { icon: Clock, title: "Your time, returned", body: "Minutes of conversation replace hours of research, comparison and refreshing booking pages." },
    { icon: Eye, title: "Total transparency", body: "Every quotation shows the base cost and our service fee separately. No hidden charges, ever." },
    { icon: Sparkles, title: "Access you don't have", body: "Tatkal expertise, last-minute fixes, visa know-how and VIP reservations — the things that are hard to do alone." },
    { icon: ShieldCheck, title: "A human who's accountable", body: "A named concierge owns your request from start to finish. Real people, real responsibility." },
  ];
  const { t } = useLanguage();
  return (
    <section id="benefits" className="px-4 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Why The Indian Connection"
            title="The confidence that it's simply handled."
            subtitle="We built this for people who value their time and peace of mind more than the thrill of the hunt."
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((it) => (
            <div key={it.title} className="rounded-3xl border border-line bg-white p-6">
              <it.icon className="h-7 w-7 text-saffron" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-xl font-semibold text-maroon-900">
                {t(it.title)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(it.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
const BASE_STORIES: Story[] = [
  { quote: "I booked my parents' Char Dham yatra from Dubai in one conversation. Every detail — even their lower berths — was handled. This is what NRIs have been waiting for.", name: "Arjun Mehta", role: "Software Director · Dubai", initials: "AM", rating: 5 },
  { quote: "Tatkal always stressed me out. They got my Delhi–Mumbai tickets confirmed and the fee was shown upfront. Worth every rupee for the peace of mind.", name: "Sunita Rao", role: "Business Owner · Pune", initials: "SR", rating: 5 },
  { quote: "At 71, the apps confuse me. I called, told them what I wanted, and they did the rest. Polite, patient and completely trustworthy.", name: "Col. R. Khanna (Retd.)", role: "Senior traveller · Lucknow", initials: "RK", rating: 5 },
];

function initialsOf(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function Testimonials() {
  const { t } = useLanguage();
  const [userStories, setUserStories] = useState<Story[]>([]);
  const [open, setOpen] = useState(false);

  const stories = [...userStories, ...BASE_STORIES];

  return (
    <section id="stories" className="bg-navy-900 px-4 py-20 text-ivory sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionHeading
            dark
            eyebrow="Success stories"
            title="Trusted by travellers across India and beyond."
          />
          <button
            onClick={() => setOpen(true)}
            className="btn-anim inline-flex cursor-pointer items-center gap-2 rounded-full bg-saffron px-6 py-3 font-semibold text-ivory hover:bg-maroon-700"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            {t("Share your story")}
          </button>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {stories.map((q, idx) => (
            <figure
              key={`${q.name}-${idx}`}
              className={`flex flex-col rounded-3xl border p-7 transition-colors ${
                q.pending
                  ? "border-saffron/50 bg-saffron/10"
                  : "border-ivory/15 bg-white/5"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < q.rating ? "fill-saffron text-saffron" : "text-ivory/25"
                      }`}
                    />
                  ))}
                </div>
                {q.pending && (
                  <span className="rounded-full bg-saffron/20 px-2.5 py-1 text-[11px] font-semibold text-saffron-soft">
                    {t("Pending review")}
                  </span>
                )}
              </div>
              <blockquote className="font-display text-xl leading-relaxed text-ivory/95">
                &ldquo;{q.pending ? q.quote : t(q.quote)}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-saffron font-semibold text-ivory">
                  {q.initials}
                </span>
                <span>
                  <span className="block font-semibold">{q.name}</span>
                  <span className="block text-sm text-ivory/60">
                    {q.pending ? q.role : t(q.role)}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {open && (
        <StoryModal
          onClose={() => setOpen(false)}
          onAdded={(s) => setUserStories((prev) => [s, ...prev])}
        />
      )}
    </section>
  );
}

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= (hover || value);
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            className="cursor-pointer p-0.5 transition-transform duration-150 hover:scale-110"
          >
            <Star
              className={`h-7 w-7 transition-colors ${
                filled ? "fill-saffron text-saffron" : "text-line"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

function StoryModal({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: (s: Story) => void;
}) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [story, setStory] = useState("");
  const [hp, setHp] = useState("");
  const [errors, setErrors] = useState<{ name?: boolean; story?: boolean }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function submit() {
    const next: { name?: boolean; story?: boolean } = {};
    if (!name.trim()) next.name = true;
    if (!story.trim()) next.story = true;
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location, rating, story, hp }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      onAdded({
        quote: story.trim(),
        name: name.trim(),
        role: location.trim() || "Traveller",
        initials: initialsOf(name) || "★",
        rating,
        pending: true,
      });
      setDone(true);
    } catch (e) {
      setSubmitError(
        e instanceof Error ? e.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-900/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-line bg-ivory p-7 text-ink shadow-lift sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer rounded-full p-1.5 text-muted transition-colors hover:bg-maroon-50 hover:text-maroon-900"
        >
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-maroon-50">
              <Check className="h-8 w-8 text-maroon-700" strokeWidth={2.5} />
            </div>
            <h3 className="mt-5 font-display text-3xl font-semibold text-maroon-900">
              {t("Thank you for sharing!")}
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-muted">
              {t(
                "Your story has been submitted and will appear after a quick review."
              )}
            </p>
            <button
              onClick={onClose}
              className="btn-anim mt-6 cursor-pointer rounded-full bg-maroon-700 px-7 py-3 font-semibold text-ivory hover:bg-maroon-900"
            >
              {t("Done")}
            </button>
          </div>
        ) : (
          <>
            <span className="ornament text-xs font-semibold uppercase tracking-[0.2em]">
              {t("Share your story")}
            </span>
            <h3 className="mt-3 font-display text-3xl font-semibold text-maroon-900">
              {t("Share your experience")}
            </h3>
            <p className="mt-1.5 text-sm text-muted">
              {t("Your words help fellow travellers book with confidence.")}
            </p>

            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-maroon-900">
                    {t("Your name")}
                  </label>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((x) => ({ ...x, name: false }));
                    }}
                    placeholder={t("Full name")}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-muted/60 transition-colors duration-200 focus:border-maroon-700 ${
                      errors.name ? "border-red-400" : "border-line"
                    }`}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-maroon-900">
                    {t("City or role")}{" "}
                    <span className="text-xs text-muted">{t("(optional)")}</span>
                  </label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mumbai"
                    className="w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-muted/60 transition-colors duration-200 focus:border-maroon-700"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-maroon-900">
                  {t("Your rating")}
                </label>
                <StarRating value={rating} onChange={setRating} />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-maroon-900">
                  {t("Your story")}
                </label>
                <textarea
                  value={story}
                  onChange={(e) => {
                    setStory(e.target.value);
                    setErrors((x) => ({ ...x, story: false }));
                  }}
                  rows={4}
                  placeholder={t("Tell us how we helped with your travel…")}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-muted/60 transition-colors duration-200 focus:border-maroon-700 ${
                    errors.story ? "border-red-400" : "border-line"
                  }`}
                />
              </div>

              {/* Honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              {submitError && (
                <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {t(submitError)}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  onClick={onClose}
                  className="cursor-pointer rounded-full px-5 py-3 font-medium text-muted transition-colors hover:text-maroon-900"
                >
                  {t("Cancel")}
                </button>
                <button
                  onClick={submit}
                  disabled={submitting}
                  className="btn-anim inline-flex cursor-pointer items-center gap-2 rounded-full bg-maroon-700 px-7 py-3 font-semibold text-ivory hover:bg-maroon-900 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                      {t("Sending…")}
                    </>
                  ) : (
                    t("Submit story")
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- Final CTA ---------------- */
export function FinalCTA() {
  const { t } = useLanguage();
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-saffron/30 bg-white p-10 text-center shadow-card sm:p-16">
        <span className="ornament text-xs font-semibold uppercase tracking-[0.2em]">
          {t("Ready when you are")}
        </span>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-maroon-900 sm:text-5xl">
          {t("Tell us where you want to go.")}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          {t(
            "Start a request now — it takes a minute, there's no payment, and a concierge will reply with a transparent quotation within the hour."
          )}
        </p>
        <a
          href="#builder"
          className="btn-anim mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-maroon-700 px-8 py-4 font-semibold text-ivory hover:bg-maroon-900"
        >
          {t("Start a request")}
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </a>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  const { t } = useLanguage();
  const cols = [
    { title: "Services", links: ["Train & Tatkal", "Flights", "Hotels", "Holiday Packages", "Visa Assistance", "Corporate Travel"] },
    { title: "Company", links: ["About", "How it works", "Success stories", "Careers", "Contact"] },
    { title: "Trust", links: ["Pricing", "Trust & Safety", "Refund policy", "Privacy", "Terms"] },
  ];
  return (
    <footer className="border-t border-line bg-white px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/logo-mark.png"
              alt="The Indian Connection — Redefining Bookings"
              width={1225}
              height={924}
              className="h-16 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-muted">
              {t("Tell us where, we'll handle the rest — a premium human concierge for Indian travel.")}
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-maroon-900">
                {t(c.title)}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted transition-colors duration-200 hover:text-maroon-700"
                    >
                      {t(l)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 hairline" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} The Indian Connection. {t("All rights reserved.")}</p>
          <p>{t("Made in India · Available in many Indian languages.")}</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- shared heading ---------------- */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <span
        className={`ornament text-xs font-semibold uppercase tracking-[0.2em] ${
          dark ? "!text-saffron-soft" : ""
        }`}
      >
        {t(eyebrow)}
      </span>
      <h2
        className={`mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl ${
          dark ? "text-ivory" : "text-maroon-900"
        }`}
      >
        {t(title)}
      </h2>
      {subtitle && (
        <p className={`mt-4 ${dark ? "text-ivory/70" : "text-muted"}`}>{t(subtitle)}</p>
      )}
    </div>
  );
}
