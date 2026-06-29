import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardView, { type DashRequest } from "@/components/DashboardView";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const raw = (user.privateMetadata as { requests?: DashRequest[] })?.requests;
  const requests = Array.isArray(raw) ? raw : [];

  return <DashboardView requests={requests} />;
}
