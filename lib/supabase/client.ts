import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client (anon key, cookie-backed session). Used by the
// login/signup forms and any client component that needs the current session.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
