"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, useUser, useClerk } from "@clerk/nextjs";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const links = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#process" },
  { label: "Watch", href: "#video" },
  { label: "Why us", href: "#benefits" },
  { label: "Stories", href: "#stories" },
];

function initialsOf(s: string) {
  const parts = s.trim().split(/[\s@.]+/).filter(Boolean);
  return (
    parts
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("") || "★"
  );
}

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 ${
          scrolled
            ? "glass border-line shadow-card"
            : "border-transparent bg-transparent"
        }`}
      >
        <a
          href="#"
          className="flex items-center gap-2.5"
          aria-label="The Indian Connection — home"
        >
          <Image
            src="/logo-mark.png"
            alt="The Indian Connection — Redefining Bookings"
            width={610}
            height={611}
            priority
            className="h-12 w-12 rounded-full sm:h-14 sm:w-14"
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="whitespace-nowrap font-display text-xl font-semibold text-maroon-900">
              The Indian Connection
            </span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-saffron">
              Redefining Bookings
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/80 transition-colors duration-200 hover:text-maroon-700"
            >
              {t(l.label)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <SignedOut>
            <SignInButton mode="modal">
              <button className="cursor-pointer text-sm font-medium text-navy-900 transition-colors duration-200 hover:text-maroon-700">
                {t("Sign in")}
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserMenu />
          </SignedIn>
          <a
            href="#builder"
            className="btn-anim cursor-pointer rounded-full bg-maroon-700 px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-maroon-900"
          >
            {t("Start a request")}
          </a>
        </div>

        <button
          className="cursor-pointer text-maroon-900 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="glass mx-auto mt-2 max-w-6xl rounded-3xl border border-line p-4 shadow-card lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-medium text-navy-900 transition-colors hover:bg-maroon-50"
              >
                {t(l.label)}
              </a>
            ))}
            <div className="mt-2 px-1">
              <LanguageSwitcher compact />
            </div>
            <SignedIn>
              <div className="mt-2">
                <MobileUser onNavigate={() => setOpen(false)} />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  onClick={() => setOpen(false)}
                  className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-center font-medium text-navy-900 transition-colors hover:bg-maroon-50"
                >
                  {t("Sign in")}
                </button>
              </SignInButton>
            </SignedOut>
            <a
              href="#builder"
              onClick={() => setOpen(false)}
              className="btn-anim mt-2 rounded-full bg-maroon-700 px-5 py-3 text-center font-semibold text-ivory hover:bg-maroon-900"
            >
              {t("Start a request")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function displayName(user: ReturnType<typeof useUser>["user"]) {
  return (
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress ||
    user?.primaryPhoneNumber?.phoneNumber ||
    "Account"
  );
}

function contactOf(user: ReturnType<typeof useUser>["user"]) {
  return (
    user?.primaryEmailAddress?.emailAddress ||
    user?.primaryPhoneNumber?.phoneNumber ||
    ""
  );
}

function UserMenu() {
  const { t } = useLanguage();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const name = displayName(user);
  const contact = contactOf(user);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex cursor-pointer items-center gap-2 rounded-full border border-line bg-white/60 py-1.5 pl-1.5 pr-3 transition-colors duration-200 hover:border-saffron hover:bg-maroon-50"
      >
        <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-saffron text-xs font-semibold text-ivory">
          {user?.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.imageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            initialsOf(name)
          )}
        </span>
        <span className="max-w-[110px] truncate text-sm font-medium text-navy-900">
          {name}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={2}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-line bg-white p-2 shadow-card">
          <div className="px-3 py-2">
            <p className="text-xs text-muted">{t("Signed in")}</p>
            <p className="truncate text-sm font-medium text-ink">{contact || name}</p>
          </div>
          <div className="my-1 h-px bg-line" />
          <a
            href="#builder"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-navy-900 transition-colors hover:bg-maroon-50"
          >
            {t("My requests")}
          </a>
          <button
            onClick={() => signOut({ redirectUrl: "/" })}
            className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-maroon-700 transition-colors hover:bg-maroon-50"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} />
            {t("Sign out")}
          </button>
        </div>
      )}
    </div>
  );
}

function MobileUser({ onNavigate }: { onNavigate: () => void }) {
  const { t } = useLanguage();
  const { user } = useUser();
  const { signOut } = useClerk();
  const name = displayName(user);

  return (
    <div className="flex items-center justify-between rounded-xl border border-line px-4 py-3">
      <span className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron text-sm font-semibold text-ivory">
          {initialsOf(name)}
        </span>
        <span className="truncate text-sm font-medium text-navy-900">{name}</span>
      </span>
      <button
        onClick={() => {
          onNavigate();
          signOut({ redirectUrl: "/" });
        }}
        className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-maroon-700"
      >
        <LogOut className="h-4 w-4" strokeWidth={2} />
        {t("Sign out")}
      </button>
    </div>
  );
}
