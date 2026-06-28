"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
  Clock,
  Sparkles,
  Loader2,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { allServices, type Field, type Service } from "@/lib/services";
import { INDIAN_CITIES } from "@/lib/cities";
import { useLanguage } from "@/components/LanguageProvider";

type Step = 0 | 1 | 2 | 3; // 0 service, 1 questions, 2 contact, 3 done
type Answers = Record<string, string>;

const STEP_LABELS = ["Service", "Details", "Contact", "Done"];

// Business WhatsApp (international format, no "+" or dashes) for click-to-chat
const BUSINESS_WHATSAPP = "918989189057";

export default function RequirementBuilder() {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>(0);
  const [service, setService] = useState<Service | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hp, setHp] = useState(""); // honeypot

  const progress = useMemo(() => ((step + 1) / 4) * 100, [step]);

  // The chatbot can hand off a chosen service: jump straight to its questions.
  useEffect(() => {
    function onSelect(e: Event) {
      const id = (e as CustomEvent).detail?.id;
      const svc = allServices.find((s) => s.id === id);
      if (svc) {
        setService(svc);
        setAnswers({});
        setErrors({});
        setSubmitError(null);
        setStep(1);
      }
    }
    window.addEventListener("tic:selectService", onSelect);
    return () => window.removeEventListener("tic:selectService", onSelect);
  }, []);

  function chooseService(s: Service) {
    setService(s);
    setAnswers({});
    setErrors({});
    setStep(1);
  }

  function setAnswer(id: string, value: string) {
    setAnswers((a) => ({ ...a, [id]: value }));
    setErrors((e) => ({ ...e, [id]: false }));
  }

  function validateQuestions(): boolean {
    if (!service) return false;
    const next: Record<string, boolean> = {};
    for (const q of service.questions) {
      if (!q.optional && !answers[q.id]?.trim()) next[q.id] = true;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateContact(): boolean {
    const next: Record<string, boolean> = {};
    if (!contact.name.trim()) next.name = true;
    if (!/^[+0-9 ]{8,15}$/.test(contact.phone.trim())) next.phone = true;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email.trim())) next.email = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submitRequest() {
    if (!service) return;
    setSubmitting(true);
    setSubmitError(null);

    const details = service.questions
      .filter((q) => answers[q.id]?.trim())
      .map((q) => ({ label: q.label, value: answers[q.id] }));

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.name,
          details,
          contact,
          hp,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStep(3);
    } catch (e) {
      setSubmitError(
        e instanceof Error ? e.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function goNext() {
    if (step === 1 && !validateQuestions()) return;
    if (step === 2) {
      if (!validateContact()) return;
      void submitRequest();
      return;
    }
    setStep((s) => (s + 1) as Step);
  }

  function restart() {
    setStep(0);
    setService(null);
    setAnswers({});
    setContact({ name: "", phone: "", email: "" });
    setErrors({});
    setSubmitError(null);
  }

  return (
    <div
      id="builder"
      className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-line bg-white shadow-lift"
    >
      {/* Header — eyebrow, live status, stepper */}
      <div className="border-b border-line px-6 py-5 sm:px-10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron">
            {t("Concierge Request")}
          </span>
          <span className="flex items-center gap-2 text-xs font-medium text-muted">
            <OnlineDot /> {t("Online now")}
          </span>
        </div>

        {/* Desktop horizontal stepper */}
        <ol className="mt-5 hidden items-center sm:flex">
          {STEP_LABELS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            const last = i === STEP_LABELS.length - 1;
            return (
              <li
                key={label}
                className={`flex items-center ${last ? "" : "flex-1"}`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-300 ${
                      done
                        ? "border-saffron bg-saffron text-ivory"
                        : active
                        ? "border-saffron text-saffron"
                        : "border-line text-muted"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                  </span>
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      active
                        ? "font-semibold text-maroon-900"
                        : done
                        ? "text-ink"
                        : "text-muted"
                    }`}
                  >
                    {t(label)}
                  </span>
                </div>
                {!last && (
                  <span
                    className={`mx-3 h-px flex-1 transition-colors duration-300 ${
                      i < step ? "bg-saffron" : "bg-line"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>

        {/* Mobile progress */}
        <div className="mt-4 sm:hidden">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted">
            <span>
              {t("Step")} {step + 1} {t("of")} 4
            </span>
            <span>{t(STEP_LABELS[step])}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-maroon-50">
            <div
              className="h-full rounded-full bg-maroon-700 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        {/* STEP 0 — service selection */}
        {step === 0 && (
          <div className="animate-fade-in">
            <h3 className="font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
              {t("What can we help you with today?")}
            </h3>
            <p className="mt-2 text-muted">
              {t(
                "Pick a service to begin. It only takes a minute, and there's no payment now."
              )}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {allServices.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => chooseService(s)}
                    className="group relative flex cursor-pointer items-center gap-4 rounded-2xl border border-line bg-ivory/50 p-5 pr-11 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-saffron hover:bg-maroon-50 hover:shadow-card"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-ivory transition-all duration-200 group-hover:scale-105 group-hover:bg-maroon-700">
                      <Icon className="h-7 w-7" strokeWidth={1.6} />
                    </span>
                    <span>
                      <span className="block text-lg font-semibold text-maroon-900">
                        {t(s.name)}
                      </span>
                      <span className="mt-0.5 block text-sm leading-snug text-muted">
                        {t(s.tagline)}
                      </span>
                    </span>
                    <ChevronRight
                      className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 -translate-x-1 text-saffron opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      strokeWidth={2}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 1 — dynamic questions */}
        {step === 1 && service && (
          <div className="animate-fade-in">
            <div className="mb-7 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-ivory">
                <service.icon className="h-7 w-7" strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="font-display text-3xl font-semibold leading-tight text-maroon-900">
                  {t(service.name)}
                </h3>
                <p className="text-sm text-muted">{t(service.tagline)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {service.questions.map((q) => (
                <FieldInput
                  key={q.id}
                  field={q}
                  value={answers[q.id] ?? ""}
                  error={errors[q.id]}
                  onChange={(v) => setAnswer(q.id, v)}
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 — contact */}
        {step === 2 && service && (
          <div className="animate-fade-in">
            <h3 className="font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
              {t("Almost there.")}
            </h3>
            <p className="mt-2 text-muted">
              {t(
                "Where should your concierge send the quotation? We'll reply within about 90 minutes."
              )}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <LabeledInput
                label="Your name"
                value={contact.name}
                error={errors.name}
                placeholder="Full name"
                onChange={(v) => setContact((c) => ({ ...c, name: v }))}
              />
              <LabeledInput
                label="WhatsApp / phone number"
                value={contact.phone}
                error={errors.phone}
                placeholder="+91 98XXXXXXXX"
                hint="We use this to send your quotation. No spam."
                onChange={(v) => setContact((c) => ({ ...c, phone: v }))}
              />
              <div className="sm:col-span-2">
                <LabeledInput
                  label="Email"
                  value={contact.email}
                  error={errors.email}
                  errorMsg="Enter a valid email address."
                  hint="We'll send your confirmation here."
                  placeholder="you@example.com"
                  onChange={(v) => setContact((c) => ({ ...c, email: v }))}
                />
              </div>
            </div>

            {/* Review summary */}
            <div className="mt-7 rounded-2xl border border-line bg-ivory/60 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-saffron">
                {t("Your request")}
              </p>
              <p className="mb-3 font-semibold text-maroon-900">
                {t(service.name)}
              </p>
              <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {service.questions
                  .filter((q) => answers[q.id]?.trim())
                  .map((q) => (
                    <div key={q.id} className="text-sm">
                      <dt className="text-muted">{t(q.label)}</dt>
                      <dd className="font-medium text-ink">{answers[q.id]}</dd>
                    </div>
                  ))}
              </dl>
              <button
                onClick={() => setStep(1)}
                className="mt-4 cursor-pointer text-sm font-semibold text-maroon-700 underline decoration-saffron/50 underline-offset-4 hover:decoration-saffron"
              >
                {t("Edit details")}
              </button>
            </div>

            {/* Honeypot — hidden from real users, catches bots */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
              aria-hidden="true"
            />

            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <ShieldCheck className="h-4 w-4 text-navy-700" strokeWidth={1.75} />
              {t("No payment now. You only pay after you approve the quotation.")}
            </p>

            {submitError && (
              <p className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                {t(submitError)}
              </p>
            )}
          </div>
        )}

        {/* STEP 3 — confirmation */}
        {step === 3 && service && (
          <div className="animate-fade-in text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-maroon-50">
              <Check className="h-8 w-8 text-maroon-700" strokeWidth={2.5} />
            </div>
            <h3 className="mt-5 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
              {t("A concierge is on it.")}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-muted">
              {t(
                "Thank you, {name}. We've received your {service} request. Your dedicated concierge will review it and send a transparent quotation shortly.",
                {
                  name: contact.name.split(" ")[0] || "",
                  service: t(service.name),
                }
              )}
            </p>

            <div className="mx-auto mt-7 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-ivory/60 p-4">
                <Clock className="mx-auto h-5 w-5 text-saffron" strokeWidth={1.75} />
                <p className="mt-2 text-sm font-semibold text-maroon-900">
                  {t("~90 minutes")}
                </p>
                <p className="text-xs text-muted">{t("to your quotation")}</p>
              </div>
              <div className="rounded-2xl border border-line bg-ivory/60 p-4">
                <Sparkles className="mx-auto h-5 w-5 text-saffron" strokeWidth={1.75} />
                <p className="mt-2 text-sm font-semibold text-maroon-900">
                  {t("No payment yet")}
                </p>
                <p className="text-xs text-muted">{t("approve, then pay")}</p>
              </div>
            </div>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(
                  `Hi, I've just submitted a ${service.name} request on The Indian Connection.${
                    contact.name ? ` My name is ${contact.name.split(" ")[0]}.` : ""
                  }`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-anim inline-flex cursor-pointer items-center gap-2 rounded-full bg-maroon-700 px-6 py-3 font-semibold text-ivory hover:bg-maroon-900"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t("Continue on WhatsApp")}
              </a>
              <button
                onClick={restart}
                className="btn-lift cursor-pointer rounded-full border border-line px-6 py-3 font-semibold text-navy-900 hover:bg-navy-50"
              >
                {t("Make another request")}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer nav */}
      {step > 0 && step < 3 && (
        <div className="flex items-center justify-between border-t border-line px-6 py-5 sm:px-10">
          <button
            onClick={() => setStep((s) => (s - 1) as Step)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-medium text-muted transition-colors duration-200 hover:text-maroon-900"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            {t("Back")}
          </button>
          <button
            onClick={goNext}
            disabled={submitting}
            className="btn-anim inline-flex cursor-pointer items-center gap-2 rounded-full bg-maroon-700 px-8 py-3.5 font-semibold text-ivory hover:bg-maroon-900 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                {t("Sending…")}
              </>
            ) : (
              <>
                {step === 2 ? t("Submit request") : t("Continue")}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </>
            )}
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="border-t border-line bg-ivory/50 px-6 py-3 text-center sm:px-10">
          <a
            href={`https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(
              service
                ? `Hi, I'd like help with a ${service.name} request.`
                : "Hi, I'd like help with a booking."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 text-sm text-muted hover:text-maroon-900"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t("Prefer to talk? Chat with us on WhatsApp and we'll fill this in for you.")}
          </a>
        </div>
      )}
    </div>
  );
}

function FieldInput({
  field,
  value,
  error,
  onChange,
}: {
  field: Field;
  value: string;
  error?: boolean;
  onChange: (v: string) => void;
}) {
  const { t } = useLanguage();
  const wrap = field.half ? "" : "sm:col-span-2";

  if (field.type === "choice") {
    return (
      <div className={wrap}>
        <Label field={field} />
        <div className="flex flex-wrap gap-2">
          {field.options!.map((opt) => {
            const active = value === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={`btn-lift cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium ${
                  active
                    ? "border-maroon-700 bg-maroon-700 text-ivory"
                    : "border-line bg-white text-navy-900 hover:border-saffron hover:bg-maroon-50"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {error && <ErrorText />}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className={wrap}>
        <Label field={field} />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full cursor-pointer rounded-xl border bg-white px-4 py-3 text-ink transition-colors duration-200 focus:border-maroon-700 ${
            error ? "border-red-400" : "border-line"
          }`}
        >
          <option value="">{t("Select…")}</option>
          {field.options!.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {error && <ErrorText />}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className={wrap}>
        <Label field={field} />
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-muted/60 transition-colors duration-200 focus:border-maroon-700 ${
            error ? "border-red-400" : "border-line"
          }`}
        />
        {error && <ErrorText />}
      </div>
    );
  }

  if (field.autocomplete === "city") {
    return (
      <div className={wrap}>
        <Label field={field} />
        <CityAutocomplete
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          error={!!error}
        />
        {error && <ErrorText />}
      </div>
    );
  }

  return (
    <div className={wrap}>
      <Label field={field} />
      <input
        type={field.type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-muted/60 transition-colors duration-200 focus:border-maroon-700 ${
          error ? "border-red-400" : "border-line"
        }`}
      />
      {error && <ErrorText />}
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  optional,
  hint,
  errorMsg,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: boolean;
  optional?: boolean;
  hint?: string;
  errorMsg?: string;
}) {
  const { t } = useLanguage();
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-maroon-900">
        {t(label)}
        {optional && <span className="ml-1 text-xs text-muted">{t("(optional)")}</span>}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ? t(placeholder) : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-muted/60 transition-colors duration-200 focus:border-maroon-700 ${
          error ? "border-red-400" : "border-line"
        }`}
      />
      {hint && !error && <p className="mt-1 text-xs text-muted">{t(hint)}</p>}
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {errorMsg ? t(errorMsg) : t("This field is required.")}
        </p>
      )}
    </div>
  );
}

function Label({ field }: { field: Field }) {
  const { t } = useLanguage();
  return (
    <label className="mb-1.5 block text-sm font-medium text-maroon-900">
      {t(field.label)}
      {field.optional && (
        <span className="ml-1 text-xs text-muted">{t("(optional)")}</span>
      )}
    </label>
  );
}

function ErrorText() {
  const { t } = useLanguage();
  return <p className="mt-1 text-xs text-red-500">{t("This field is required.")}</p>;
}

// City field with Indian-city suggestions (free typing still allowed)
function CityAutocomplete({
  value,
  onChange,
  placeholder,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [] as string[];
    const starts = INDIAN_CITIES.filter((c) => c.toLowerCase().startsWith(q));
    const rest = INDIAN_CITIES.filter(
      (c) => !c.toLowerCase().startsWith(q) && c.toLowerCase().includes(q)
    );
    return [...starts, ...rest].slice(0, 7);
  }, [value]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Hide the list once the value already equals the only remaining match
  const show =
    open &&
    matches.length > 0 &&
    !(matches.length === 1 && matches[0].toLowerCase() === value.trim().toLowerCase());

  function choose(c: string) {
    onChange(c);
    setOpen(false);
    setHi(-1);
  }

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        value={value}
        autoComplete="off"
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setHi(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (!show) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHi((h) => Math.min(h + 1, matches.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHi((h) => Math.max(h - 1, 0));
          } else if (e.key === "Enter" && hi >= 0) {
            e.preventDefault();
            choose(matches[hi]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-muted/60 transition-colors duration-200 focus:border-maroon-700 ${
          error ? "border-red-400" : "border-line"
        }`}
      />
      {show && (
        <ul className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-line bg-white py-1 shadow-card">
          {matches.map((c, i) => (
            <li key={c}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(c);
                }}
                onMouseEnter={() => setHi(i)}
                className={`flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                  i === hi ? "bg-maroon-50 text-maroon-900" : "text-ink hover:bg-ivory"
                }`}
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-saffron" strokeWidth={2} />
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Pulsing "online" indicator (green = available)
function OnlineDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="live-ping absolute inline-flex h-full w-full rounded-full bg-[#3FB37A]" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#3FB37A]" />
    </span>
  );
}

// Official WhatsApp glyph (Simple Icons) — uses currentColor
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.358.101 11.892c0 2.096.546 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.582 0 11.94-5.358 11.944-11.893a11.821 11.821 0 0 0-3.487-8.413Z" />
    </svg>
  );
}
