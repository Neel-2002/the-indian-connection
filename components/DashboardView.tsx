"use client";

import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight, Plus, Inbox } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

interface Detail {
  label: string;
  value: string;
}
export interface DashRequest {
  id: string;
  service: string;
  details: Detail[];
  createdAt: string;
  status: string;
}

export default function DashboardView({
  requests,
}: {
  requests: DashRequest[];
}) {
  const { t, locale } = useLanguage();

  function fmt(iso: string) {
    try {
      return new Date(iso).toLocaleString(locale, {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return iso;
    }
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Top bar */}
      <header className="border-b border-line bg-white/60 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="/" className="flex items-center gap-2.5" aria-label="The Indian Connection — home">
            <Image
              src="/logo-mark.png"
              alt="The Indian Connection"
              width={610}
              height={611}
              className="h-11 w-11 rounded-full"
            />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-lg font-semibold text-maroon-900">
                The Indian Connection
              </span>
              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-saffron">
                Redefining Bookings
              </span>
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/#builder"
              className="btn-anim inline-flex cursor-pointer items-center gap-2 rounded-full bg-maroon-700 px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-maroon-900"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              {t("New request")}
            </a>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 pt-12 sm:px-6">
        <span className="ornament text-xs font-semibold uppercase tracking-[0.2em]">
          {t("Signed in")}
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-maroon-900 sm:text-5xl">
          {t("My requests")}
        </h1>
        <p className="mt-3 text-muted">
          {t("Track the requests you've sent to our concierge.")}
        </p>

        {requests.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-line bg-white p-12 text-center shadow-card">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-maroon-50">
              <Inbox className="h-8 w-8 text-maroon-700" strokeWidth={1.5} />
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold text-maroon-900">
              {t("You haven't made any requests yet.")}
            </h3>
            <a
              href="/#builder"
              className="btn-anim mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-maroon-700 px-7 py-3.5 font-semibold text-ivory hover:bg-maroon-900"
            >
              {t("Start your first request")}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>
        ) : (
          <div className="mt-10 grid gap-5">
            {requests.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-maroon-900">
                      {t(r.service)}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted">
                      {t("Requested on")} {fmt(r.createdAt)}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-saffron/15 px-3 py-1 text-xs font-semibold text-saffron">
                    {t(r.status)}
                  </span>
                </div>
                {r.details?.length > 0 && (
                  <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-line pt-5 sm:grid-cols-2">
                    {r.details.map((d, i) => (
                      <div key={i} className="text-sm">
                        <dt className="text-muted">{t(d.label)}</dt>
                        <dd className="mt-0.5 font-medium text-ink">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
