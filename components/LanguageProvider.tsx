"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  STORAGE_KEY,
  translate,
  type Locale,
} from "@/lib/i18n";

interface Ctx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (s: string, vars?: Record<string, string>) => string;
}

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Restore saved choice on mount
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved) setLocaleState(saved);
  }, []);

  // Keep <html lang> and storage in sync
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback(
    (s: string, vars?: Record<string, string>) => {
      let out = translate(locale, s);
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          out = out.replace(new RegExp(`\\{${k}\\}`, "g"), v);
        }
      }
      return out;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Safe fallback if used outside a provider (returns English)
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t: (s: string, vars?: Record<string, string>) => {
        let out = s;
        if (vars)
          for (const [k, v] of Object.entries(vars))
            out = out.replace(new RegExp(`\\{${k}\\}`, "g"), v);
        return out;
      },
    };
  }
  return ctx;
}
