import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/api";
import { Wordmark } from "@/components/ui/Wordmark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UserMenu } from "@/components/dashboard/UserMenu";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware already gates this, but guard here too so server data fetches
  // never run unauthenticated.
  if (!user) redirect("/login");

  const profile = await getProfile();
  const displayName = profile?.displayName ?? user.email?.split("@")[0] ?? "You";

  return (
    <div className="flex min-h-screen flex-col">
      {/* top bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-background/80 px-4 backdrop-blur-xl sm:px-6">
        <Link href="/" aria-label="Home">
          <Wordmark className="text-lg" />
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserMenu
            name={displayName}
            email={user.email ?? ""}
            avatarUrl={profile?.avatarUrl ?? null}
          />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-4 py-8 sm:px-6">
        {/* sidebar */}
        <aside className="hidden w-52 shrink-0 md:block">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </aside>

        {/* content */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
