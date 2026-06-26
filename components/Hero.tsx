"use client";

import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
      {/* Ambient heritage backdrop — maroon + navy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 0%, rgba(194,78,18,0.10), transparent 70%), radial-gradient(45% 40% at 88% 18%, rgba(0,39,102,0.10), transparent 70%), radial-gradient(45% 40% at 10% 30%, rgba(104,19,33,0.08), transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — thesis */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-saffron">
            The Indian Connection · Redefining Bookings
          </span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-maroon-900 sm:text-6xl lg:text-7xl">
            {t("Tell us where.")}
            <br />
            <span className="text-navy-900">{t("We'll handle the rest.")}</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            {t(
              "One short conversation is all it takes. A real concierge — not a chatbot — handles the research, the booking, and the paperwork, then sends you a transparent quotation."
            )}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#builder"
              className="btn-anim inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-maroon-700 px-7 py-4 font-semibold text-ivory hover:bg-maroon-900"
            >
              {t("Tell us what you need")}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>
            <a
              href="#process"
              className="btn-lift inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-navy-900/25 px-7 py-4 font-semibold text-navy-900 hover:bg-navy-50"
            >
              {t("How it works")}
            </a>
          </div>

          {/* Trust row — honest signals for a new service */}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron/40 bg-saffron/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-saffron">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} /> {t("Now in beta")}
            </span>
            <span className="hidden h-4 w-px bg-line sm:block" />
            <span>{t("Human concierge, not a bot")}</span>
            <span className="hidden h-4 w-px bg-line sm:block" />
            <span>{t("Free quote in ~90 min")}</span>
          </div>
        </div>

        {/* Right — signature transformation card */}
        <div className="animate-fade-up [animation-delay:150ms]">
          <QuoteCard />
        </div>
      </div>
    </section>
  );
}

function QuoteCard() {
  const { t } = useLanguage();
  return (
    <div className="relative mx-auto max-w-md">
      {/* Request card (behind) */}
      <div className="rounded-3xl border border-line bg-white/85 p-5 shadow-card backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron">
          {t("Your request")}
        </p>
        <div className="mt-3 space-y-2.5">
          <Line label={t("Train & Tatkal")} value="Delhi → Mumbai" />
          <Line label={t("Date of travel")} value="12 Aug · 2" />
          <Line label={t("Class preference")} value="AC 2-Tier" />
        </div>
      </div>

      {/* Quotation card (front, offset) — clearly an illustrative sample */}
      <div className="relative -mt-6 ml-8 rounded-3xl border border-saffron/40 bg-navy-900 p-6 text-ivory shadow-lift">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron-soft">
            {t("Your quotation")}
          </p>
          <span className="inline-flex items-center gap-1 rounded-full border border-saffron/50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-saffron-soft">
            {t("Sample")}
          </span>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <Row label="Ticket fare (2 pax)" value="₹4,310" />
          <Row label="Tatkal handling" value="₹260" />
          <Row label={t("Service fee")} value="₹399" />
        </div>

        <div className="my-4 hairline" />

        <div className="flex items-end justify-between">
          <span className="text-sm text-ivory/70">{t("Total, all-inclusive")}</span>
          <span className="font-display text-3xl font-semibold">₹4,969</span>
        </div>

        <a
          href="#process"
          className="btn-anim mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-saffron px-5 py-3 font-semibold text-ivory hover:bg-maroon-700"
        >
          {t("See how it works")}
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </a>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ivory/60">
          <Check className="h-3.5 w-3.5 text-saffron-soft" strokeWidth={2.5} />
          {t("Every fee shown upfront. No hidden charges.")}
        </p>
      </div>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ivory/70">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
