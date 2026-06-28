import { clerkMiddleware } from "@clerk/nextjs/server";

// Clerk runs on every route but does not protect anything by default —
// the marketing site and the request APIs stay public; sign-in is optional.
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless referenced in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpg|jpeg|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
