"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export interface AuthUser {
  name: string;
  contact: string;
}

interface AuthCtx {
  user: AuthUser | null;
  openSignIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);
const STORAGE_KEY = "tic-user";

export function initialsOf(name: string, contact: string) {
  const base = name.trim() || contact.trim();
  const parts = base.split(/[\s@.]+/).filter(Boolean);
  return (
    parts
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("") || "★"
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        /* ignore */
      }
    }
  }, []);

  const signIn = useCallback((u: AuthUser) => {
    setUser(u);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setOpen(false);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const openSignIn = useCallback(() => setOpen(true), []);

  return (
    <AuthContext.Provider value={{ user, openSignIn, signOut }}>
      {children}
      {open && <SignInModal onClose={() => setOpen(false)} onSignedIn={signIn} />}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) return { user: null, openSignIn: () => {}, signOut: () => {} };
  return ctx;
}

function SignInModal({
  onClose,
  onSignedIn,
}: {
  onClose: () => void;
  onSignedIn: (u: AuthUser) => void;
}) {
  const { t } = useLanguage();
  const [stage, setStage] = useState<"enter" | "verify">("enter");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState(false);
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [sending, setSending] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function sendCode() {
    if (!contact.trim()) {
      setContactError(true);
      return;
    }
    setSending(true);
    // Demo: simulate sending an OTP
    setTimeout(() => {
      setSending(false);
      setStage("verify");
      setTimeout(() => inputsRef.current[0]?.focus(), 50);
    }, 600);
  }

  function setDigit(i: number, v: string) {
    const d = v.replace(/\D/g, "").slice(-1);
    setCode((prev) => {
      const next = [...prev];
      next[i] = d;
      return next;
    });
    if (d && i < 5) inputsRef.current[i + 1]?.focus();
  }

  function onCodeKey(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  }

  function onPaste(e: React.ClipboardEvent) {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (digits.length) {
      e.preventDefault();
      const next = ["", "", "", "", "", ""];
      for (let i = 0; i < digits.length; i++) next[i] = digits[i];
      setCode(next);
      inputsRef.current[Math.min(digits.length, 5)]?.focus();
    }
  }

  function verify() {
    const display =
      name.trim() ||
      (contact.includes("@")
        ? contact.split("@")[0]
        : t("Signed in"));
    onSignedIn({ name: display, contact: contact.trim() });
  }

  const codeFull = code.join("").length === 6;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-900/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-line bg-ivory p-7 text-ink shadow-lift sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer rounded-full p-1.5 text-muted transition-colors hover:bg-maroon-50 hover:text-maroon-900"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="ornament text-xs font-semibold uppercase tracking-[0.2em]">
          {t("Sign in")}
        </span>
        <h3 className="mt-3 font-display text-3xl font-semibold text-maroon-900">
          {t("Sign in to your account")}
        </h3>

        {stage === "enter" ? (
          <div className="mt-5 space-y-4">
            <p className="text-sm text-muted">
              {t("Continue with your phone or email — we'll send a one-time code.")}
            </p>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-maroon-900">
                {t("Your name (optional)")}
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("Full name")}
                className="w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-muted/60 transition-colors focus:border-maroon-700"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-maroon-900">
                {t("Phone or email")}
              </label>
              <input
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  setContactError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendCode();
                }}
                placeholder="+91 98XXXXXXXX"
                className={`w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-muted/60 transition-colors focus:border-maroon-700 ${
                  contactError ? "border-red-400" : "border-line"
                }`}
              />
              {contactError && (
                <p className="mt-1 text-xs text-red-500">
                  {t("This field is required.")}
                </p>
              )}
            </div>
            <button
              onClick={sendCode}
              disabled={sending}
              className="btn-anim flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-maroon-700 px-6 py-3.5 font-semibold text-ivory hover:bg-maroon-900 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
              ) : (
                <>
                  {t("Send code")}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <p className="text-sm text-muted">
              {t("We've sent a code to {contact}.", { contact })}{" "}
              <button
                onClick={() => setStage("enter")}
                className="cursor-pointer font-semibold text-maroon-700 underline decoration-saffron/50 underline-offset-4 hover:decoration-saffron"
              >
                {t("Change")}
              </button>
            </p>

            <label className="block text-sm font-medium text-maroon-900">
              {t("Enter the 6-digit code")}
            </label>
            <div className="flex justify-between gap-2">
              {code.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  value={d}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => onCodeKey(i, e)}
                  onPaste={i === 0 ? onPaste : undefined}
                  inputMode="numeric"
                  maxLength={1}
                  className="h-14 w-full rounded-xl border border-line bg-white text-center font-display text-2xl font-semibold text-maroon-900 transition-colors focus:border-maroon-700"
                />
              ))}
            </div>

            <p className="rounded-lg bg-saffron/10 px-3 py-2 text-center text-xs text-saffron">
              {t("Demo mode — enter any 6 digits to continue.")}
            </p>

            <button
              onClick={verify}
              disabled={!codeFull}
              className="btn-anim flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-maroon-700 px-6 py-3.5 font-semibold text-ivory hover:bg-maroon-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check className="h-4 w-4" strokeWidth={2.5} />
              {t("Verify & sign in")}
            </button>
            <button
              onClick={() => setStage("enter")}
              className="flex w-full cursor-pointer items-center justify-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-maroon-900"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              {t("Back")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
