import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Only the app surface needs session refresh + gating. The marketing pages
  // stay untouched (and keep working even if Supabase env isn't configured).
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
