"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { LOCALES } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className={`btn-lift inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line bg-white/60 px-3 py-2 text-sm font-medium text-navy-900 hover:border-saffron hover:bg-maroon-50 ${
          compact ? "w-full justify-center" : ""
        }`}
      >
        <Globe className="h-4 w-4" strokeWidth={1.75} />
        <span>{current.native}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={2}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute z-50 mt-2 max-h-72 w-44 overflow-auto rounded-2xl border border-line bg-white p-1.5 shadow-card ${
            compact ? "left-0 right-0 w-full" : "right-0"
          }`}
        >
          {LOCALES.map((l) => {
            const active = l.code === locale;
            return (
              <li key={l.code}>
                <button
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setLocale(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                    active
                      ? "bg-maroon-50 text-maroon-900"
                      : "text-ink hover:bg-ivory"
                  }`}
                >
                  <span>
                    <span className="font-medium">{l.native}</span>
                    {l.english !== l.native && (
                      <span className="ml-2 text-xs text-muted">{l.english}</span>
                    )}
                  </span>
                  {active && (
                    <Check className="h-4 w-4 text-maroon-700" strokeWidth={2.5} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
