import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AuthProvider } from "@/components/AuthProvider";
import AmbientBackground from "@/components/AmbientBackground";
import ChatBot from "@/components/ChatBot";

// Roman inscriptional serif — matches "THE INDIAN CONNECTION" wordmark
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Indian Connection — Redefining Bookings",
  description:
    "A premium human concierge for Indian travel. Tell us what you need in one conversation; a real concierge arranges it end-to-end and sends a transparent quotation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        <AmbientBackground />
        <LanguageProvider>
          <AuthProvider>
            {children}
            <ChatBot />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
