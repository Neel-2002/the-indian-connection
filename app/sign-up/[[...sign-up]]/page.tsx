import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <a href="/" className="mb-8" aria-label="The Indian Connection — home">
        <Image
          src="/logo-mark.png"
          alt="The Indian Connection — Redefining Bookings"
          width={610}
          height={611}
          priority
          className="h-20 w-20 rounded-full"
        />
      </a>
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#8E1F2F",
            colorText: "#1C1A15",
            borderRadius: "0.85rem",
          },
        }}
      />
    </main>
  );
}
