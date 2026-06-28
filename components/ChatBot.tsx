"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, X, Send, ArrowRight, Phone, Mail, LogIn } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { allServices } from "@/lib/services";
import { useLanguage } from "@/components/LanguageProvider";

const BUSINESS_WHATSAPP = "918989189057";
const BUSINESS_EMAIL = "jainneelrock@gmail.com";
const BUSINESS_PHONE = "+918989189057";

// Keyword hints used to route a free-text message to a service id.
const SERVICE_KEYWORDS: Record<string, string[]> = {
  train: ["train", "tatkal", "rail", "irctc", "pnr", "berth"],
  flights: ["flight", "air", "plane", "airline", "fly"],
  hotels: ["hotel", "stay", "room", "resort", "accommodation"],
  holidays: ["holiday", "package", "tour", "vacation", "itinerary"],
  visa: ["visa", "passport", "schengen", "immigration"],
  pilgrimage: ["pilgrim", "char dham", "tirupati", "yatra", "temple", "darshan"],
  luxury: ["luxury", "premium", "villa", "honeymoon"],
  corporate: ["corporate", "company", "business travel", "team"],
  other: ["bus", "event", "transfer", "vip"],
};

interface ChatMsg {
  id: number;
  role: "bot" | "user";
  text: string;
  quick?: string[];
  services?: boolean;
  serviceAction?: string; // service id -> "Open X request" button
  contact?: boolean;
  signin?: boolean; // render a "Sign in" button
}

const QUICK_BOOK = "Book a service";
const QUICK_HUMAN = "Talk to a human";
const QUICK_HOW = "How it works";
const QUICK_PRICE = "Pricing & fees";
const INITIAL_QUICK = [QUICK_BOOK, QUICK_HUMAN, QUICK_HOW, QUICK_PRICE];

function detectService(text: string): string | null {
  const lc = text.toLowerCase();
  for (const [id, words] of Object.entries(SERVICE_KEYWORDS)) {
    if (words.some((w) => lc.includes(w))) return id;
  }
  return null;
}

export default function ChatBot() {
  const { t } = useLanguage();
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const idRef = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);

  const nextId = () => ++idRef.current;

  function pushBot(msg: Omit<ChatMsg, "id" | "role">) {
    setMessages((m) => [...m, { id: nextId(), role: "bot", ...msg }]);
  }
  function pushUser(text: string) {
    setMessages((m) => [...m, { id: nextId(), role: "user", text }]);
  }

  // Greet on first open
  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true);
      pushBot({
        text: "Namaste! I'm The Indian Connection assistant. How can I help you today?",
        quick: INITIAL_QUICK,
      });
    }
  }, [open, greeted]);

  // Auto-scroll to newest message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open]);

  function openService(id: string) {
    const svc = allServices.find((s) => s.id === id);
    if (!svc) return;
    if (!isSignedIn) {
      pushBot({
        text: t("You'll need to sign in first to send a request."),
        signin: true,
      });
      return;
    }
    pushBot({
      text: t("Opening the request form below — I've selected {service} for you.", {
        service: t(svc.name),
      }),
    });
    window.dispatchEvent(new CustomEvent("tic:selectService", { detail: { id } }));
    setTimeout(() => {
      document.getElementById("builder")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
    setTimeout(() => setOpen(false), 1500);
  }

  function respond(text: string) {
    const lc = text.toLowerCase();
    const svc = detectService(text);

    if (svc) {
      const name = t(allServices.find((s) => s.id === svc)!.name);
      pushBot({
        text: t("Open {service} request", { service: name }),
        serviceAction: svc,
      });
      return;
    }
    if (/contact|human|admin|agent|talk|call|support|representative|reach|whatsapp|phone/.test(lc)) {
      pushBot({ text: t("You can reach our team directly:"), contact: true });
      return;
    }
    if (/how|work|process|step/.test(lc)) {
      pushBot({
        text: t(
          "Tell us what you need, a real person prepares a clear quote with the fee shown upfront, you approve, and we book it. No payment to enquire."
        ),
        quick: [QUICK_BOOK, QUICK_HUMAN],
      });
      return;
    }
    if (/price|pricing|fee|cost|charge|pay|payment|money|rupee|₹/.test(lc)) {
      pushBot({
        text: t(
          "Our service fee is always shown upfront in your quotation — no hidden charges. You only pay after you approve."
        ),
        quick: [QUICK_BOOK, QUICK_HUMAN],
      });
      return;
    }
    if (/\b(hi|hello|hey|namaste|namaskar|hola)\b/.test(lc)) {
      pushBot({
        text: "Namaste! I'm The Indian Connection assistant. How can I help you today?",
        quick: INITIAL_QUICK,
      });
      return;
    }
    pushBot({
      text: t(
        "I'm not sure I understood. You can ask me to book a service, explain how it works, or connect you with our team."
      ),
      quick: INITIAL_QUICK,
    });
  }

  function handleQuick(label: string) {
    if (label === QUICK_BOOK) {
      pushUser(t(label));
      pushBot({ text: t("Which service would you like to book?"), services: true });
      return;
    }
    pushUser(t(label));
    respond(label);
  }

  function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    pushUser(text);
    respond(text);
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t("Chat with us")}
        className="fixed bottom-5 right-5 z-[55] flex h-14 w-14 items-center justify-center rounded-full bg-maroon-700 text-ivory shadow-lift transition-all duration-200 hover:scale-110 hover:bg-maroon-900 active:scale-95"
      >
        {!open && (
          <span className="live-ping absolute inline-flex h-full w-full rounded-full bg-maroon-700/60" />
        )}
        {open ? (
          <X className="relative h-6 w-6" strokeWidth={2} />
        ) : (
          <MessageCircle className="relative h-6 w-6" strokeWidth={2} />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="animate-fade-up fixed bottom-24 right-4 z-[55] flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-line bg-ivory shadow-lift sm:right-5">
          {/* Header */}
          <div className="flex items-center gap-3 bg-navy-900 px-5 py-4 text-ivory">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-saffron">
              <Bot className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div className="flex-1">
              <p className="font-semibold leading-tight">{t("Assistant")}</p>
              <p className="flex items-center gap-1.5 text-xs text-ivory/70">
                <span className="relative flex h-2 w-2">
                  <span className="live-ping absolute inline-flex h-full w-full rounded-full bg-[#3FB37A]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3FB37A]" />
                </span>
                {t("Online")}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="cursor-pointer rounded-full p-1.5 text-ivory/80 transition-colors hover:bg-white/10 hover:text-ivory"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div key={m.id}>
                <div
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-maroon-700 text-ivory"
                        : "rounded-bl-md border border-line bg-white text-ink"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>

                {/* Service chips */}
                {m.services && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {allServices.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          pushUser(t(s.name));
                          openService(s.id);
                        }}
                        className="cursor-pointer rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-navy-900 btn-lift hover:border-saffron hover:bg-maroon-50"
                      >
                        {t(s.name)}
                      </button>
                    ))}
                  </div>
                )}

                {/* Open-request action button */}
                {m.serviceAction && (
                  <div className="mt-2">
                    <button
                      onClick={() => openService(m.serviceAction!)}
                      className="btn-anim inline-flex cursor-pointer items-center gap-2 rounded-full bg-maroon-700 px-4 py-2 text-sm font-semibold text-ivory hover:bg-maroon-900"
                    >
                      {t("Open {service} request", {
                        service: t(
                          allServices.find((s) => s.id === m.serviceAction)!.name
                        ),
                      })}
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </button>
                  </div>
                )}

                {/* Contact buttons */}
                {m.contact && (
                  <div className="mt-2 flex flex-col gap-2">
                    <a
                      href={`https://wa.me/${BUSINESS_WHATSAPP}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-medium text-navy-900 btn-lift hover:border-saffron hover:bg-maroon-50"
                    >
                      <Phone className="h-4 w-4 text-saffron" strokeWidth={2} />
                      WhatsApp · {BUSINESS_PHONE}
                    </a>
                    <a
                      href={`mailto:${BUSINESS_EMAIL}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-medium text-navy-900 btn-lift hover:border-saffron hover:bg-maroon-50"
                    >
                      <Mail className="h-4 w-4 text-saffron" strokeWidth={2} />
                      {t("Email us")}
                    </a>
                    <a
                      href={`tel:${BUSINESS_PHONE}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-medium text-navy-900 btn-lift hover:border-saffron hover:bg-maroon-50"
                    >
                      <Phone className="h-4 w-4 text-saffron" strokeWidth={2} />
                      {t("Call us")}
                    </a>
                  </div>
                )}

                {/* Sign-in prompt */}
                {m.signin && (
                  <div className="mt-2">
                    <a
                      href="/sign-in"
                      className="btn-anim inline-flex cursor-pointer items-center gap-2 rounded-full bg-maroon-700 px-4 py-2 text-sm font-semibold text-ivory hover:bg-maroon-900"
                    >
                      <LogIn className="h-4 w-4" strokeWidth={2} />
                      {t("Sign in")}
                    </a>
                  </div>
                )}

                {/* Quick replies */}
                {m.quick && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.quick.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleQuick(q)}
                        className="btn-lift cursor-pointer rounded-full border border-saffron/50 bg-saffron/10 px-3 py-1.5 text-xs font-semibold text-saffron hover:bg-saffron hover:text-ivory"
                      >
                        {t(q)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-line bg-white px-3 py-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder={t("Type your message…")}
              className="flex-1 rounded-full border border-line bg-ivory/60 px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-maroon-700"
            />
            <button
              onClick={send}
              aria-label={t("Chat with us")}
              className="btn-anim flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-maroon-700 text-ivory hover:bg-maroon-900"
            >
              <Send className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
